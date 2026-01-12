"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type {
  WebSocketMessage,
  UploadMessage,
  TranscriptionData,
  ProgressInfo,
  ErrorInfo,
  ConnectionStatus,
} from "@/lib/types/transcription";
import { encodeFileToBase64, validateAudioFile } from "@/lib/utils/fileEncoder";
import { saveTranscription } from "@/lib/utils/storage";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  "ws://callmate-alb-168190832.ap-northeast-2.elb.amazonaws.com/api/v1/transcripts/ws/transcribe";

interface UseWebSocketTranscriptionReturn {
  status: ConnectionStatus;
  progress: ProgressInfo | null;
  result: TranscriptionData | null;
  error: ErrorInfo | null;
  uploadFile: (file: File, languageCode?: string, keywords?: string[]) => Promise<void>;
  reset: () => void;
  isConnected: boolean;
}

export const useWebSocketTranscription = (): UseWebSocketTranscriptionReturn => {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const [result, setResult] = useState<TranscriptionData | null>(null);
  const [error, setError] = useState<ErrorInfo | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileNameRef = useRef<string>("");

  /**
   * WebSocket 메시지 핸들러
   */
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);

      switch (message.status) {
        case "received":
          setStatus("uploading");
          setProgress({ percent: 0, message: "파일 업로드 완료" });
          break;

        case "processing":
          setStatus("processing");
          setProgress(message.progress);
          break;

        case "completed":
          setStatus("completed");
          setProgress({ percent: 100, message: "전사 완료" });
          setResult(message.data);

          // 결과 로컬 저장
          try {
            saveTranscription(fileNameRef.current, message.data);
          } catch (saveError) {
            console.error("결과 저장 실패:", saveError);
          }
          break;

        case "error":
          setStatus("error");
          setError(message.error);
          break;

        default:
          console.warn("알 수 없는 메시지 타입:", message);
      }
    } catch (parseError) {
      console.error("메시지 파싱 실패:", parseError);
      setStatus("error");
      setError({
        code: "PARSE_ERROR",
        message: "서버 응답을 처리할 수 없습니다.",
      });
    }
  }, []);

  /**
   * WebSocket 에러 핸들러
   */
  const handleError = useCallback((event: Event) => {
    console.error("WebSocket 에러:", event);
    setStatus("error");
    setError({
      code: "CONNECTION_ERROR",
      message: "서버 연결 중 오류가 발생했습니다.",
    });
  }, []);

  /**
   * WebSocket 연결 종료 핸들러
   */
  const handleClose = useCallback(() => {
    setStatus((prev) => {
      if (prev === "completed" || prev === "error") return prev;
      return "disconnected";
    });
  }, []);

  /**
   * WebSocket 연결
   */
  const connect = useCallback((): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        setStatus("connected");
        resolve(ws);
      };

      ws.onerror = (event) => {
        handleError(event);
        reject(new Error("WebSocket 연결 실패"));
      };

      ws.onmessage = handleMessage;
      ws.onclose = handleClose;

      wsRef.current = ws;
    });
  }, [handleMessage, handleError, handleClose]);

  /**
   * 파일 업로드
   */
  const uploadFile = useCallback(
    async (file: File, languageCode: string = "ko", keywords?: string[]) => {
      // 1. 파일 유효성 검증
      const validation = validateAudioFile(file);
      if (!validation.isValid) {
        setStatus("error");
        setError({
          code: "VALIDATION_ERROR",
          message: validation.error || "파일 검증 실패",
        });
        return;
      }

      fileNameRef.current = file.name;

      try {
        // 2. WebSocket 연결
        setStatus("connecting");
        setProgress({ percent: 0, message: "서버 연결 중..." });

        const ws = await connect();

        // 3. 파일 인코딩
        setProgress({ percent: 10, message: "파일 인코딩 중..." });
        const base64Data = await encodeFileToBase64(file);

        // 4. 업로드 메시지 전송
        setStatus("uploading");
        setProgress({ percent: 20, message: "파일 업로드 중..." });

        const uploadMessage: UploadMessage = {
          action: "upload",
          filename: file.name,
          data: base64Data,
          language_code: languageCode,
          keywords,
        };

        ws.send(JSON.stringify(uploadMessage));
      } catch (uploadError) {
        console.error("업로드 실패:", uploadError);
        setStatus("error");
        setError({
          code: "UPLOAD_ERROR",
          message:
            uploadError instanceof Error
              ? uploadError.message
              : "파일 업로드 중 오류가 발생했습니다.",
        });
      }
    },
    [connect]
  );

  /**
   * 상태 초기화
   */
  const reset = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setStatus("idle");
    setProgress(null);
    setResult(null);
    setError(null);
    fileNameRef.current = "";
  }, []);

  /**
   * 클린업
   */
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return {
    status,
    progress,
    result,
    error,
    uploadFile,
    reset,
    isConnected: status === "connected" || status === "uploading" || status === "processing",
  };
};

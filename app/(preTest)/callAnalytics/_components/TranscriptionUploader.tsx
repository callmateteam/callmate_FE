"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FileUploadInput from "@/components/common/FileUploadInput";
import ErrorDisplay from "./ErrorDisplay";
import { useWebSocketTranscription } from "@/lib/hooks/useWebSocketTranscription";
import ProcessingStatus from "./ProcessingStatus";

export default function TranscriptionUploader() {
  const router = useRouter();
  const { status, result, error, uploadFile, reset } = useWebSocketTranscription();

  const handleFileSelect = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    uploadFile(file);
  };

  const handleRetry = () => {
    reset();
  };

  // 전사 완료 시 callResult 페이지로 이동
  useEffect(() => {
    if (status === "completed" && result) {
      router.push(`/callResult?id=${result.transcript_id}`);
    }
  }, [status, result, router]);

  // idle 또는 error 상태일 때만 파일 업로드 UI 표시
  const showUploadUI = status === "idle" || (status === "error" && !result);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* 파일 업로드 UI */}
      {showUploadUI && (
        <FileUploadInput
          title="통화 녹음 파일 업로드"
          description="(파일 지원 형식: MP3, WAV, M4A)"
          accept="audio/mpeg,audio/wav,audio/x-m4a,audio/mp4,.mp3,.wav,.m4a"
          onFileSelect={handleFileSelect}
          error="Callmate는 분석 후 녹음 파일 및 텍스트 데이터를 즉시 파기하며, 서버에 저장하지 않습니다."
        />
      )}

      {/* 연결 중, 업로드 중 상태 */}
      {(status === "connecting" || status === "uploading") && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-neutral-200 bg-white py-16">
          <p className="text-body-m text-neutral-600">파일 업로드중...</p>
          <div className="relative h-1 w-64 overflow-hidden rounded-full bg-neutral-200">
            <div className="absolute inset-0 bg-secondary-500" style={{ animation: "progress 1.5s infinite" }} />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      {/* 분석 중 상태 - 스켈레톤 UI */}
      {status === "processing" && <ProcessingStatus />}
      {/* 에러 표시 */}
      {status === "error" && error && <ErrorDisplay error={error} onRetry={handleRetry} />}

      {/* 연결 끊김 상태 */}
      {status === "disconnected" && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <p className="text-headline-s text-yellow-800">연결이 끊어졌습니다</p>
          <p className="text-body-m mt-2 text-yellow-600">
            서버와의 연결이 끊어졌습니다. 다시 시도해주세요.
          </p>
          <button
            onClick={handleRetry}
            className="mt-4 rounded-lg bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * WebSocket 통신을 위한 전사 관련 타입 정의
 */

// 발화 정보
export interface Utterance {
  speaker: string;
  start: number; // 밀리초
  end: number; // 밀리초
  text: string;
  confidence?: number; // 신뢰도
}

// 전사 결과 데이터
export interface TranscriptionData {
  transcript_id?: string;
  full_text?: string; // 전체 텍스트
  utterances: Utterance[];
  speakers?: string[]; // 화자 목록
  duration: number; // 밀리초
  language_code?: string;
}

// 파일 정보
export interface FileInfo {
  file_id: string;
  duration_ms: number;
}

// 진행률 정보
export interface ProgressInfo {
  percent: number;
  message: string;
}

// 에러 정보
export interface ErrorInfo {
  code: string;
  message: string;
}

// WebSocket 메시지 타입
export type WebSocketMessage =
  | {
      status: "received";
      data: FileInfo;
    }
  | {
      status: "processing";
      progress: ProgressInfo;
    }
  | {
      status: "completed";
      data: TranscriptionData;
    }
  | {
      status: "error";
      error: ErrorInfo;
    };

// 클라이언트 → 서버 업로드 메시지
export interface UploadMessage {
  action: "upload";
  filename: string;
  data: string; // base64 encoded
  language_code: string;
  keywords?: string[];
}

// WebSocket 연결 상태
export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "uploading"
  | "processing"
  | "completed"
  | "error"
  | "disconnected";

// 파일 유효성 검증 결과
export interface FileValidation {
  isValid: boolean;
  error?: string;
}

// 저장된 전사 결과 (localStorage용)
export interface SavedTranscription {
  id: string;
  filename: string;
  data: TranscriptionData;
  createdAt: string;
}

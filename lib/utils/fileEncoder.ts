/**
 * 파일 인코딩 및 검증 유틸리티
 */

import type { FileValidation } from "@/lib/types/transcription";

// 지원하는 오디오 형식
const SUPPORTED_FORMATS = ["audio/mpeg", "audio/wav", "audio/x-m4a", "audio/mp4"];
const SUPPORTED_EXTENSIONS = [".mp3", ".wav", ".m4a"];

// 30분 = 1800초, 평균 비트레이트 128kbps 기준 약 30MB
const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB
const MAX_DURATION_MINUTES = 30;

/**
 * 파일을 base64로 인코딩
 */
export const encodeFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // "data:audio/mpeg;base64," 부분 제거하고 순수 base64만 반환
      const base64 = result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("파일 읽기 중 오류가 발생했습니다."));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * 파일 확장자 검증
 */
const validateFileExtension = (filename: string): boolean => {
  const extension = filename.toLowerCase().slice(filename.lastIndexOf("."));
  return SUPPORTED_EXTENSIONS.includes(extension);
};

/**
 * 파일 유효성 검증
 */
export const validateAudioFile = (file: File): FileValidation => {
  // 1. 파일 형식 검증
  if (!SUPPORTED_FORMATS.includes(file.type) && !validateFileExtension(file.name)) {
    return {
      isValid: false,
      error: "지원하지 않는 파일 형식입니다. (지원 형식: MP3, WAV, M4A)",
    };
  }

  // 2. 파일 크기 검증
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB를 초과할 수 없습니다.`,
    };
  }

  // 3. 파일 크기가 너무 작은 경우 (최소 1KB)
  if (file.size < 1024) {
    return {
      isValid: false,
      error: "파일이 너무 작습니다. 유효한 오디오 파일인지 확인해주세요.",
    };
  }

  return { isValid: true };
};

/**
 * 파일 크기를 사람이 읽기 쉬운 형식으로 변환
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * 오디오 지속 시간 추정 (정확하지 않음, UI 표시용)
 */
export const estimateAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);

    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration);
    };

    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("오디오 메타데이터를 읽을 수 없습니다."));
    };

    audio.src = url;
  });
};

"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import type { ErrorInfo } from "@/lib/types/transcription";

interface ErrorDisplayProps {
  error: ErrorInfo;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorDisplay({ error, onRetry, className = "" }: ErrorDisplayProps) {
  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-lg border border-red-200 bg-red-50 p-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
        <div className="flex flex-col gap-1">
          <p className="text-headline-s text-red-800">오류가 발생했습니다</p>
          <p className="text-body-m text-red-600">{error.message}</p>
          {error.code && <p className="text-label-s text-red-400">오류 코드: {error.code}</p>}
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="text-label-m">다시 시도</span>
        </button>
      )}

      <div className="mt-2 rounded-lg bg-red-100 p-3">
        <p className="text-label-s text-red-700">문제가 계속되면 다음을 확인해주세요:</p>
        <ul className="text-label-s mt-2 list-inside list-disc space-y-1 text-red-600">
          <li>파일 형식이 MP3, WAV, M4A인지 확인</li>
          <li>파일 크기가 30MB 이하인지 확인</li>
          <li>오디오 길이가 30분 이하인지 확인</li>
          <li>인터넷 연결 상태 확인</li>
        </ul>
      </div>
    </div>
  );
}

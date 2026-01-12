"use client";

import ProgressBar from "@/components/common/ProgressBar";
import type { ProgressInfo } from "@/lib/types/transcription";

interface TranscriptionProgressProps {
  progress: ProgressInfo;
  className?: string;
}

export default function TranscriptionProgress({
  progress,
  className = "",
}: TranscriptionProgressProps) {
  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-body-m text-neutral-600">{progress.message}</p>
          <p className="text-label-m text-neutral-400">{progress.percent}%</p>
        </div>

        <ProgressBar percentage={progress.percent} height="8px" />
      </div>

      {progress.percent < 100 && (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary-500 border-t-transparent" />
          <p className="text-label-s text-neutral-400">처리 중입니다. 잠시만 기다려주세요.</p>
        </div>
      )}
    </div>
  );
}

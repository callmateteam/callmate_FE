"use client";

import ProgressBar from "./ProgressBar";

interface ProgressIndicatorCardProps {
  progress?: number;
}

export default function ProgressIndicatorCard({ progress = 0 }: ProgressIndicatorCardProps) {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <div className="rounded-2xl bg-neutral-800 p-6 shadow-2xl">
        <div className="mb-4 flex flex-col gap-2">
          <p className="text-title-s text-white">
            소중한 통화를 분석하고 있어요. 잠시만 기다려 주세요.
          </p>
          <p className="text-title-s text-left text-white">{progress}%</p>
        </div>
        <ProgressBar percentage={progress} height="6px" className="w-full" />
      </div>
    </div>
  );
}

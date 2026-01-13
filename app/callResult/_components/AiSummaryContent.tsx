"use client";

import AiSummaryBorder from "./mobile/AiSummaryBorder";
import Chips from "@/components/common/Chips";
import { useAiSummary } from "@/lib/hooks/useAiSummary";
import type { Utterance } from "@/lib/types/transcription";

interface AiSummaryContentProps {
  utterances: Utterance[];
  speakers?: string[];
}

/**
 * AI 요약 표시 컴포넌트 (모바일/데스크톱 공통)
 */
export default function AiSummaryContent({
  utterances,
  speakers = ["A", "B"],
}: AiSummaryContentProps) {
  const { data: summary, isLoading, error, refetch } = useAiSummary({
    utterances,
    speakers,
    mySpeaker: "A", // 상담원은 "A"로 가정
  });

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="mt-5 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-400 border-t-transparent" />
          <p className="text-body-l text-neutral-400">AI 분석 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-body-l text-center text-neutral-900">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="rounded-lg bg-accent-400 px-6 py-2 text-white transition-colors hover:bg-accent-500"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 데이터 없음
  if (!summary) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center py-20">
        <p className="text-body-l text-neutral-400">AI 요약 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-3">
      {/* AI 분석 */}
      <AiSummaryBorder>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-m text-neutral-900">AI 분석</h3>
            {summary.customer_state && <Chips text={summary.customer_state} />}
          </div>
          <p className="text-body-l text-[#1F2937]">{summary.summary}</p>
        </div>
      </AiSummaryBorder>

      {/* 응대 피드백 (TODO: 향후 API 추가 시 구현) */}
      <AiSummaryBorder>
        <div className="flex flex-col gap-5">
          <h3 className="text-headline-m text-neutral-900">응대 피드백</h3>
          <p className="text-body-m text-neutral-400">응대 피드백 기능은 준비 중입니다.</p>
        </div>
      </AiSummaryBorder>
    </div>
  );
}

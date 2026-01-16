"use client";

import AiSummaryBorder from "./mobile/AiSummaryBorder";
import Chips from "@/components/common/Chips";
import FeedbackCard from "@/components/common/FeedbackCard";
import SpeakerSelector from "./SpeakerSelector";
import type { SummaryResponse, FeedbackResponse } from "@/lib/types/analysis";

interface AiSummaryContentProps {
  summary: SummaryResponse | undefined;
  summaryError: Error | null;
  refetchSummary: () => void;
  feedback: FeedbackResponse | undefined;
  feedbackError: Error | null;
  refetchFeedback: () => void;
  selectedSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
  speakers: string[];
}

/**
 * AI 요약 표시 컴포넌트 (모바일/데스크톱 공통)
 * - props로 데이터를 받아서 표시만 담당
 */
export default function AiSummaryContent({
  summary,
  summaryError,
  refetchSummary,
  feedback,
  feedbackError,
  refetchFeedback,
  selectedSpeaker,
  onSpeakerChange,
  speakers,
}: AiSummaryContentProps) {
  // 에러 상태
  if (summaryError) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-body-l text-center text-neutral-900">{summaryError.message}</p>
        <button
          onClick={() => refetchSummary()}
          className="bg-accent-400 hover:bg-accent-500 rounded-lg px-6 py-2 text-white transition-colors"
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

      {/* 응대 피드백 */}
      <AiSummaryBorder>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-m text-neutral-900">응대 피드백</h3>
            <SpeakerSelector
              speakers={speakers}
              selectedSpeaker={selectedSpeaker}
              onSpeakerChange={onSpeakerChange}
            />
          </div>

          {/* 피드백 에러 상태 */}
          {feedbackError && (
            <div className="flex flex-col items-center gap-3 py-10">
              <p className="text-body-s text-center text-neutral-900">{feedbackError.message}</p>
              <button
                onClick={() => refetchFeedback()}
                className="rounded-lg bg-accent-400 px-4 py-2 text-body-s text-white transition-colors hover:bg-accent-500"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 피드백 데이터 표시 */}
          {feedback && !feedbackError && (
            <div className="flex flex-col gap-3">
              {feedback.feedbacks.map((item, index) => (
                <FeedbackCard key={index} title={item.title} subtext={item.content} />
              ))}
            </div>
          )}

          {/* 피드백 데이터 없음 */}
          {!feedback && !feedbackError && (
            <p className="py-10 text-center text-body-s text-neutral-400">
              피드백 데이터가 없습니다.
            </p>
          )}
        </div>
      </AiSummaryBorder>
    </div>
  );
}

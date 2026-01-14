"use client";

import { useState } from "react";
import AiSummaryBorder from "./mobile/AiSummaryBorder";
import SpeakerSelector from "./SpeakerSelector";
import { useFeedback } from "@/lib/hooks/useFeedback";
import type { Utterance } from "@/lib/types/transcription";

interface FeedbackContentProps {
  utterances: Utterance[];
  speakers?: string[];
}

/**
 * 응대 피드백 컴포넌트 (모바일/데스크톱 공통)
 */
export default function FeedbackContent({
  utterances,
  speakers = ["A", "B"],
}: FeedbackContentProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState("A");

  const {
    data: feedback,
    isLoading,
    error,
    refetch,
  } = useFeedback({
    utterances,
    speakers,
    mySpeaker: selectedSpeaker,
  });

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-400 border-t-transparent" />
          <p className="text-body-l text-neutral-400">응대 피드백 분석 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
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
  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-body-l text-neutral-400">
          응대 피드백 데이터가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* 상담사 선택 */}
      <SpeakerSelector
        speakers={speakers}
        selectedSpeaker={selectedSpeaker}
        onSpeakerChange={setSelectedSpeaker}
      />

      {/* 피드백 리스트 */}
      <div className="flex flex-col gap-3">
        <h3 className="text-headline-m text-neutral-900">
          응대 피드백 ({feedback.feedbacks.length}개)
        </h3>

        {feedback.feedbacks.map((item, index) => (
          <AiSummaryBorder key={index}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-headline-s text-neutral-900">{item.title}</h4>
                <span className="rounded-full bg-accent-100 px-3 py-1 text-label-s text-accent-700">
                  {getFeedbackTypeLabel(item.type)}
                </span>
              </div>
              <p className="text-body-m text-neutral-700 whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          </AiSummaryBorder>
        ))}
      </div>
    </div>
  );
}

/**
 * 피드백 타입 라벨 변환
 */
function getFeedbackTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    loss_emphasis: "손실 강조",
    gain_emphasis: "이득 강조",
    social_proof: "사회적 증거",
    scarcity: "희소성",
    reciprocity: "상호성",
    authority: "권위",
  };
  return labels[type] || type;
}

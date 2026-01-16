"use client";

import CallDetailsContent from "../CallDetailsContent";
import AiSummaryContent from "../AiSummaryContent";
import type { SavedTranscription } from "@/lib/types/transcription";
import type { SummaryResponse, FeedbackResponse } from "@/lib/types/analysis";

interface DesktopMainProps {
  transcription: SavedTranscription;
  summary: SummaryResponse | undefined;
  feedback: FeedbackResponse | undefined;
  summaryError: Error | null;
  feedbackError: Error | null;
  refetchSummary: () => void;
  refetchFeedback: () => void;
  selectedSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
  speakers: string[];
}

/**
 * 데스크톱 통화 결과 메인 컴포넌트
 * 좌우 2단 레이아웃으로 통화 내용과 AI 요약을 동시에 표시
 */
export default function DesktopMain({
  transcription,
  summary,
  feedback,
  summaryError,
  feedbackError,
  refetchSummary,
  refetchFeedback,
  selectedSpeaker,
  onSpeakerChange,
  speakers,
}: DesktopMainProps) {
  const { utterances } = transcription.data;

  return (
    <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-2 gap-6">
      {/* 좌측: 통화 내용 */}
      <div className="flex flex-col">
        <h2 className="text-title-l mb-4 text-neutral-900">통화 내용</h2>
        <div className="flex-1 overflow-y-auto">
          <CallDetailsContent utterances={utterances} />
        </div>
      </div>

      {/* 우측: AI 요약 */}
      <div className="flex flex-col">
        <h2 className="text-title-l mb-4 text-neutral-900">AI 요약</h2>
        <div className="flex-1 overflow-y-auto">
          <AiSummaryContent
            summary={summary}
            summaryError={summaryError}
            refetchSummary={refetchSummary}
            feedback={feedback}
            feedbackError={feedbackError}
            refetchFeedback={refetchFeedback}
            selectedSpeaker={selectedSpeaker}
            onSpeakerChange={onSpeakerChange}
            speakers={speakers}
          />
        </div>
      </div>
    </div>
  );
}

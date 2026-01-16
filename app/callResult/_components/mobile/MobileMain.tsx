"use client";

import React, { useState } from "react";
import SegmentButton from "@/components/common/SegmentButton";
import CallDetailsContent from "../CallDetailsContent";
import AiSummaryContent from "../AiSummaryContent";
import type { SavedTranscription } from "@/lib/types/transcription";
import type { SummaryResponse, FeedbackResponse } from "@/lib/types/analysis";

interface MobileMainProps {
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

export default function MobileMain({
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
}: MobileMainProps) {
  const [selectedSegment, setSelectedSegment] = useState("option1");

  return (
    <div>
      <SegmentButton
        options={[
          { label: "통화 내용", value: "option1" },
          { label: "AI 요약", value: "option2" },
        ]}
        value={selectedSegment}
        onChange={setSelectedSegment}
      />

      {selectedSegment === "option1" ? (
        <CallDetailsContent utterances={transcription.data.utterances} />
      ) : (
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
      )}
    </div>
  );
}

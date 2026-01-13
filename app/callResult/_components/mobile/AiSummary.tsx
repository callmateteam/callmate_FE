"use client";

import React from "react";
import AiSummaryContent from "../AiSummaryContent";
import type { SavedTranscription } from "@/lib/types/transcription";

interface AiSummaryProps {
  transcription: SavedTranscription;
}

/**
 * 모바일 AI 요약 래퍼 컴포넌트
 */
export default function AiSummary({ transcription }: AiSummaryProps) {
  return (
    <AiSummaryContent
      utterances={transcription.data.utterances}
      speakers={transcription.data.speakers}
    />
  );
}

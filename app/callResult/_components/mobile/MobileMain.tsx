"use client";

import React, { useState } from "react";
import SegmentButton from "@/components/common/SegmentButton";
import CallDetailsContent from "../CallDetailsContent";
import AiSummary from "./AiSummary";
import type { SavedTranscription } from "@/lib/types/transcription";

interface MobileMainProps {
  transcription: SavedTranscription;
}

export default function MobileMain({ transcription }: MobileMainProps) {
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
        <AiSummary transcription={transcription} />
      )}
    </div>
  );
}

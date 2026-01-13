"use client";

import React, { useState } from "react";
import ResultHeading from "../ResultHeading";
import SegmentButton from "@/components/common/SegmentButton";
import CallDetails from "./CallDetails";
import AiSummary from "./AiSummary";

const selected = "option1";

export default function MobileMain() {
  const [selectedSegment, setSelectedSegment] = useState(selected);
  return (
    <div>
      <ResultHeading name="테스트" totalTime="4분 35초" />
      <SegmentButton
        options={[
          { label: "통화 내용", value: "option1" },
          { label: "AI 요약", value: "option2" },
        ]}
        value={selectedSegment}
        onChange={setSelectedSegment}
      />
      {selectedSegment === selected ? <CallDetails /> : <AiSummary />}
    </div>
  );
}

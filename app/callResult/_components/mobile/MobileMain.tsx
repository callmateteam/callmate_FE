"use client";

import React, { useState } from "react";
import ResultHeading from "../ResultHeading";
import SegmentButton from "@/components/common/SegmentButton";
import SearchInput from "@/components/common/SearchInput";
import SttBox from "@/components/common/SttBox";

const mockdata = [
  { speaker: "A", text: "여보세요?", start: 160, end: 659, confidence: 0.85009766 },
  {
    speaker: "B",
    text: "네 강개리 님 안녕하세요. 저 재무설계센터에 박필립 센터장입니다.",
    start: 1360,
    end: 4500,
  },
  { speaker: "A", text: "누구 누구시라고요?", start: 5520, end: 6580, confidence: 0.8106283 },
  { speaker: "B", text: "재무설계센터요.", start: 7759, end: 8260, confidence: 0.9569092 },
  { speaker: "B", text: "지난주에", start: 8960, end: 9460, confidence: 0.9951172 },
  {
    speaker: "B",
    text: "재무상담 신청하셨잖아요.",
    start: 9840,
    end: 10900,
    confidence: 0.68444824,
  },
  { speaker: "B", text: "성함", start: 12255, end: 12495, confidence: 0.9873 },
];

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
      {selectedSegment === selected ? (
        <div className="mt-5">
          <SearchInput />
          <div className="mt-4 flex flex-col gap-2">
            {mockdata.map((mock) => (
              <SttBox
                key={mock.confidence}
                stt={mock.speaker === "A" ? "me" : "client"}
                text={mock.text}
              />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

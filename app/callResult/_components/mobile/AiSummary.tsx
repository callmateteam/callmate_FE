"use client";

import React from "react";
import AiSummaryBorder from "./AiSummaryBorder";
import Chips from "@/components/common/Chips";
import FeedbackCard from "@/components/common/FeedbackCard";

export default function AiSummary() {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <AiSummaryBorder>
        <div className="flex flex-col gap-5">
          <h3 className="text-headline-m text-neutral-900">AI 분석</h3>
          <p className="text-body-l text-[#1F2937]">
            AI 분석 내용 3줄 요약입니다. AI 분석 내용 3줄 요약입니다. AI 분석 내용 3줄 요약입니다.
            AI 분석 내용 3줄 요약입니다. AI 분석 내용 3줄 요약입니다. AI 분석 내용 3줄 요약입니다.
            AI 분석 내용 3줄 요약입니다. AI 분석 내용 3줄 요약입니다.{" "}
          </p>
        </div>
      </AiSummaryBorder>
      <AiSummaryBorder>
        <div className="flex flex-col gap-5">
          <h3 className="text-headline-m text-neutral-900">응대 피드백</h3>
          <div className="flex items-center gap-2">
            <Chips text="손싱 강조" />
            <Chips text="대안 제시" />
            <Chips text="손싱 강조" />
          </div>
          <div className="flex flex-col gap-3">
            <FeedbackCard
              title="손실 강조하기"
              subtext="지금 지금 해지하시면 그동안 납입하신 금액의 약 40%만 환급받으시게 되는데, 이 부분도 꼭 고려하셔야 할 것 같아요."
              recommend={true}
            />
            <FeedbackCard
              title="손실 강조하기"
              subtext="지금 지금 해지하시면 그동안 납입하신 금액의 약 40%만 환급받으시게 되는데, 이 부분도 꼭 고려하셔야 할 것 같아요."
            />
            <FeedbackCard
              title="손실 강조하기"
              subtext="지금 지금 해지하시면 그동안 납입하신 금액의 약 40%만 환급받으시게 되는데, 이 부분도 꼭 고려하셔야 할 것 같아요."
            />
          </div>
        </div>
      </AiSummaryBorder>
    </div>
  );
}

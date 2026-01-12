"use client";

import { useState } from "react";
import SurveyList, { SurveyOption } from "@/components/common/SurveyList";
import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";

interface SurveyModalContentProps {
  onClose: () => void;
}

const surveyOptions: SurveyOption[] = [
  {
    id: "quality-improvement",
    title: "인내 / 정보 제공",
    description: "고객 문의에 인내하거나 정보를 안내하는 상담",
  },
  {
    id: "complaint-refund",
    title: "민원 / 유지 / 설득",
    description: "상품을 유지하거나, 해지를 막거나, 환급이나이트등을 처리하는 상담",
  },
  {
    id: "schedule-document",
    title: "일정 / 문서 예약",
    description: "고객 일정을 차아이하거나, 환급/서류 작성등을 돕는 상담",
  },
];

export default function SurveyModalContent({ onClose }: SurveyModalContentProps) {
  const [selectedId, setSelectedId] = useState<string>();

  const handleSubmit = () => {
    if (!selectedId) {
      alert("옵션을 선택해주세요.");
      return;
    }

    // TODO: 여기서 선택된 값으로 API 호출 또는 다른 처리
    console.log("선택된 옵션:", selectedId);
    onClose();
  };

  return (
    <div className="flex flex-col gap-10">
      {/* 질문 */}
      <h3 className="text-title-l text-neutral-900">1. 주로 어떤 상담을 하시나요?</h3>

      {/* 설문 리스트 */}
      <SurveyList
        options={surveyOptions}
        selectedId={selectedId}
        onChange={setSelectedId}
        name="survey-question-1"
      />

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-3">
        <button onClick={onClose} className="text-label-l text-error-500 cursor-pointer">
          나가기
        </button>
        <Button variant="primary" onClick={handleSubmit}>
          다음
        </Button>
      </div>
    </div>
  );
}

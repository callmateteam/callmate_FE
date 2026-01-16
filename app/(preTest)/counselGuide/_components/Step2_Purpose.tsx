"use client";

import SurveyList, { SurveyOption } from "@/components/common/SurveyList";
import type { ConsultationType } from "@/lib/types/analysis";

interface Step2PurposeProps {
  selectedPurpose?: ConsultationType;
  onPurposeChange: (value: ConsultationType) => void;
}

const purposeOptions: SurveyOption[] = [
  {
    id: "consulting",
    title: "안내 / 정보 제공",
    description: "제품·서비스 설명, 일반 문의 응대",
  },
  {
    id: "sales",
    title: "판매 / 유지 / 설득",
    description: "신규 가입 유도, 재계약, 업셀링, 해지 방어",
  },
  {
    id: "cs",
    title: "불만 /  문제 해결",
    description: "클레임 처리, CS, 환불/AS 접수",
  },
];

/**
 * Step 2: 상담 목적 선택
 */
export default function Step2Purpose({ selectedPurpose, onPurposeChange }: Step2PurposeProps) {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-title-l text-neutral-900">2. 주로 어떤 상담을 하시나요?</h3>

      <SurveyList
        options={purposeOptions}
        selectedId={selectedPurpose}
        onChange={(id) => onPurposeChange(id as ConsultationType)}
        name="consultation-purpose"
      />
    </div>
  );
}

"use client";

import SurveyStepSection from "@/components/common/SurveyStepSection";

interface Step3AInformationProps {
  selectedTypes: string[];
  selectedKeyPoints: string[];
  selectedFaqTypes: string[];
  onTypesChange: (value: string[]) => void;
  onKeyPointsChange: (value: string[]) => void;
  onFaqTypesChange: (value: string[]) => void;
  activeSection: number;
}

const targetTypeOptions = [
  { id: "service", label: "서비스 / 솔루션" },
  { id: "product", label: "제품" },
  { id: "plan", label: "요금제 / 플랜 / 프로그램" },
  { id: "policy", label: "정책 / 제도 / 규정" },
  { id: "general", label: "기타 일반 안내" },
];

const keyPointOptions = [
  { id: "features", label: "주요 기능 / 구성" },
  { id: "usage", label: "사용 방법 / 절차" },
  { id: "benefits", label: "장점 / 기대 효과" },
  { id: "cost", label: "비용 / 조건 / 이용 범위" },
  { id: "limitations", label: "제한 사항 / 유의 사항" },
  { id: "trust", label: "신뢰 근거 (기준, 수치, 사례)" },
];

const faqTypeOptions = [
  { id: "usage_method", label: "이용 방법 / 절차" },
  { id: "cost", label: "비용 / 요금 관련" },
  { id: "conditions", label: "조건 / 범위 / 대상" },
  { id: "limitations", label: "제한 사항 / 불가 여부" },
  { id: "support", label: "추가 지원 / 문의 채널" },
];

/**
 * Step 3-A: 안내 / 정보 제공
 */
export default function Step3AInformation({
  selectedTypes,
  selectedKeyPoints,
  selectedFaqTypes,
  onTypesChange,
  onKeyPointsChange,
  onFaqTypesChange,
  activeSection,
}: Step3AInformationProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* 3. 안내 대상 유형 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={0}
        tag="[안내/정보 제공]"
        label="3. 안내하는 대상의 유형을 선택해주세요."
        options={targetTypeOptions}
        selectedIds={selectedTypes}
        onChange={onTypesChange}
        name="consulting-target-type"
      />

      {/* 3-A-2. 주요 특장점 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={1}
        tag="[안내/정보 제공]"
        label="4. 안내 시 반드시 전달되어야 하는 요소를 선택해주세요. *"
        options={keyPointOptions}
        selectedIds={selectedKeyPoints}
        onChange={onKeyPointsChange}
        name="consulting-key-points"
      />

      {/* 3-A-3. 자주 묻는 질문 유형 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={2}
        tag="[안내/정보 제공]"
        label="5. 안내 중 자주 등장하는 질문 유형을 선택해주세요. *"
        options={faqTypeOptions}
        selectedIds={selectedFaqTypes}
        onChange={onFaqTypesChange}
        name="consulting-faq-types"
      />
    </div>
  );
}

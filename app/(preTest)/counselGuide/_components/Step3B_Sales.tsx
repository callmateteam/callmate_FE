"use client";

import SurveyStepSection from "@/components/common/SurveyStepSection";

interface Step3BSalesProps {
  selectedTargetTypes: string[];
  selectedKeyEmphasis: string[];
  selectedPricingScope: string[];
  selectedComparisonPoints: string[];
  selectedRejectionTypes: string[];
  onTargetTypesChange: (value: string[]) => void;
  onKeyEmphasisChange: (value: string[]) => void;
  onPricingScopeChange: (value: string[]) => void;
  onComparisonPointsChange: (value: string[]) => void;
  onRejectionTypesChange: (value: string[]) => void;
  activeSection: number;
}

const targetTypeOptions = [
  { id: "service", label: "서비스 / 솔루션" },
  { id: "product", label: "제품" },
  { id: "plan", label: "요금제 / 플랜" },
  { id: "package", label: "패키지 / 옵션 상품" },
];

const keyEmphasisOptions = [
  { id: "core_features", label: "핵심 기능 또는 차별 요소" },
  { id: "benefits", label: "사용 시 얻는 이점" },
  { id: "cost_effect", label: "비용 대비 효과" },
  { id: "cases", label: "활용 사례 / 신뢰 요소" },
  { id: "long_term", label: "장기적 가치 / 효율성" },
];

const pricingScopeOptions = [
  { id: "basic_price", label: "기능 / 구성 차이" },
  { id: "discount", label: "가격 / 비용 구조" },
  { id: "conditional", label: "조건부 혜택 안내" },
  { id: "quote", label: "사용 편의성" },
  { id: "no_price", label: "지원 범위 / 운영 방식" },
  { id: "no_text", label: "비교 설명 없음" },
];

const comparisonPointsOptions = [
  { id: "features", label: "가격이 부담됨" },
  { id: "pricing", label: "필요성을 느끼지 못함" },
  { id: "usability", label: "이미 다른 대안 사용 중" },
  { id: "support", label: "결정 보류 / 검토 필요" },
  { id: "no_comparison", label: "관심 없음" },
];

/**
 * Step 3-B: 판매 / 유지 / 설득
 */
export default function Step3BSales({
  selectedTargetTypes,
  selectedKeyEmphasis,
  selectedPricingScope,
  selectedComparisonPoints,
  selectedRejectionTypes,
  onTargetTypesChange,
  onKeyEmphasisChange,
  onPricingScopeChange,
  onComparisonPointsChange,
  onRejectionTypesChange,
  activeSection,
}: Step3BSalesProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* 3-B-1. 제안 대상 유형 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={0}
        tag="[ 판매/유지/설득 ]"
        label="3. 제안 대상 유형"
        options={targetTypeOptions}
        selectedIds={selectedTargetTypes}
        onChange={onTargetTypesChange}
        name="sales-target-type"
      />

      {/* 3-B-2. 강조해야 할 핵심 요소 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={1}
        tag="[ 판매/유지/설득 ]"
        label="4. 설득 시 강조해야 할 요소를 선택해주세요. *"
        options={keyEmphasisOptions}
        selectedIds={selectedKeyEmphasis}
        onChange={onKeyEmphasisChange}
        name="sales-key-emphasis"
      />

      {/* 3-B-3. 가격 / 혜택 정보 범위 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={2}
        tag="[ 판매/유지/설득 ]"
        label="5. 비교 설명이 필요한 경우, 어떤 관점에서 설명하나요? *"
        options={pricingScopeOptions}
        selectedIds={selectedPricingScope}
        onChange={onPricingScopeChange}
        name="sales-pricing-scope"
      />

      {/* 3-B-4. 경쟁 서비스 대비 포인트 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={3}
        tag="[ 판매/유지/설득 ]"
        label="6. 설득 과정에서 자주 나오는 반응을 선택해주세요. *"
        options={comparisonPointsOptions}
        selectedIds={selectedComparisonPoints}
        onChange={onComparisonPointsChange}
        name="sales-comparison-points"
      />
    </div>
  );
}

"use client";

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
  { id: "basic_price", label: "기본 가격 정보" },
  { id: "discount", label: "할인 / 프로모션 안내" },
  { id: "conditional", label: "조건부 혜택 안내" },
  { id: "quote", label: "개별 견적 필요" },
  { id: "no_price", label: "가격 안내 불가" },
];

const comparisonPointsOptions = [
  { id: "features", label: "기능 / 구성 차이" },
  { id: "pricing", label: "가격 / 비용 구조" },
  { id: "usability", label: "사용 편의성" },
  { id: "support", label: "지원 범위 / 운영 방식" },
  { id: "no_comparison", label: "비교 설명 없음" },
];

const rejectionTypeOptions = [
  { id: "expensive", label: "가격이 부담됨" },
  { id: "no_need", label: "필요성을 느끼지 못함" },
  { id: "using_other", label: "이미 다른 대안 사용 중" },
  { id: "defer", label: "결정 보류 / 검토 필요" },
  { id: "not_interested", label: "관심 없음" },
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
}: Step3BSalesProps) {
  const toggleSelection = (
    id: string,
    currentList: string[],
    onChange: (value: string[]) => void,
    maxCount?: number
  ) => {
    if (currentList.includes(id)) {
      onChange(currentList.filter((item) => item !== id));
    } else {
      if (maxCount && currentList.length >= maxCount) {
        alert(`최대 ${maxCount}개까지만 선택할 수 있습니다.`);
        return;
      }
      onChange([...currentList, id]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-title-l text-neutral-900">3. 대화 기준 설정</h3>

      {/* 3-B-1. 제안 대상 유형 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-B-1. 제안 대상 유형</label>
          <p className="text-body-s text-neutral-500">제안하거나 설명하는 대상 유형을 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {targetTypeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedTargetTypes.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedTargetTypes, onTargetTypesChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-B-2. 강조해야 할 핵심 요소 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-B-2. 강조해야 할 핵심 요소 (최대 5개)</label>
          <p className="text-body-s text-neutral-500">설득 시 강조해야 할 요소를 선택해주세요.</p>
        </div>
        <div className="flex flex-col gap-2">
          {keyEmphasisOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedKeyEmphasis.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedKeyEmphasis, onKeyEmphasisChange, 5)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-B-3. 가격 / 혜택 정보 범위 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-B-3. 가격 / 혜택 정보 범위</label>
          <p className="text-body-s text-neutral-500">대화 중 안내 가능한 가격·혜택 범위를 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {pricingScopeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedPricingScope.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedPricingScope, onPricingScopeChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-B-4. 경쟁 서비스 대비 포인트 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-B-4. 경쟁 서비스 대비 포인트</label>
          <p className="text-body-s text-neutral-500">비교 설명이 필요한 경우, 어떤 관점에서 설명하나요? (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {comparisonPointsOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedComparisonPoints.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedComparisonPoints, onComparisonPointsChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-B-5. 자주 나오는 거절 유형 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-B-5. 자주 나오는 거절 유형</label>
          <p className="text-body-s text-neutral-500">설득 과정에서 자주 나오는 반응을 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {rejectionTypeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedRejectionTypes.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedRejectionTypes, onRejectionTypesChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

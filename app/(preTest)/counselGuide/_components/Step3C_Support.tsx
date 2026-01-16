"use client";

interface Step3CSupportProps {
  selectedProblemTypes: string[];
  selectedResolutionSteps: string[];
  selectedCompensationScope: string[];
  selectedEscalationCriteria: string[];
  onProblemTypesChange: (value: string[]) => void;
  onResolutionStepsChange: (value: string[]) => void;
  onCompensationScopeChange: (value: string[]) => void;
  onEscalationCriteriaChange: (value: string[]) => void;
}

const problemTypeOptions = [
  { id: "usage_error", label: "사용 오류 / 기능 문제" },
  { id: "billing", label: "요금 / 결제 관련" },
  { id: "policy", label: "정책 / 조건 불만" },
  { id: "delay", label: "지연 / 처리 상태 문의" },
  { id: "other", label: "기타 요청 / 불편 사항" },
];

const resolutionStepOptions = [
  { id: "check_situation", label: "상황 확인" },
  { id: "empathy", label: "공감 및 안내" },
  { id: "explain_cause", label: "원인 설명" },
  { id: "suggest_solution", label: "해결 방법 제시" },
  { id: "follow_up", label: "후속 안내" },
];

const compensationScopeOptions = [
  { id: "re_explain", label: "추가 안내 및 재설명" },
  { id: "limited_benefit", label: "제한적 혜택 제공" },
  { id: "adjust_schedule", label: "일정 / 조건 조정" },
  { id: "alternative", label: "대안 제시 가능" },
  { id: "no_compensation", label: "보상 또는 예외 불가" },
];

const escalationCriteriaOptions = [
  { id: "repeated_issue", label: "반복된 동일 문제" },
  { id: "emotional_response", label: "감정적 반응 또는 강한 불만" },
  { id: "out_of_policy", label: "정책 범위를 벗어난 요청" },
  { id: "manager_needed", label: "책임자 판단 필요" },
  { id: "no_escalation", label: "별도 연결 기준 없음" },
];

/**
 * Step 3-C: 불만 / 문제 해결
 */
export default function Step3CSupport({
  selectedProblemTypes,
  selectedResolutionSteps,
  selectedCompensationScope,
  selectedEscalationCriteria,
  onProblemTypesChange,
  onResolutionStepsChange,
  onCompensationScopeChange,
  onEscalationCriteriaChange,
}: Step3CSupportProps) {
  const toggleSelection = (
    id: string,
    currentList: string[],
    onChange: (value: string[]) => void
  ) => {
    if (currentList.includes(id)) {
      onChange(currentList.filter((item) => item !== id));
    } else {
      onChange([...currentList, id]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-title-l text-neutral-900">3. 대화 기준 설정</h3>

      {/* 3-C-1. 자주 발생하는 문제 유형 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-C-1. 자주 발생하는 문제 유형</label>
          <p className="text-body-s text-neutral-500">대화 중 자주 접수되는 문제 유형을 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {problemTypeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedProblemTypes.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedProblemTypes, onProblemTypesChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-C-2. 기본 해결 절차 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-C-2. 기본 해결 절차</label>
          <p className="text-body-s text-neutral-500">문제 대응 시 기본적으로 따르는 절차를 선택해주세요. (순서 무관, 복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {resolutionStepOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedResolutionSteps.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedResolutionSteps, onResolutionStepsChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-C-3. 보상 / 대안 제시 가능 범위 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-C-3. 보상 / 대안 제시 가능 범위</label>
          <p className="text-body-s text-neutral-500">제안 가능한 대응 범위를 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {compensationScopeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedCompensationScope.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedCompensationScope, onCompensationScopeChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-C-4. 에스컬레이션 기준 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-C-4. 에스컬레이션 기준</label>
          <p className="text-body-s text-neutral-500">어떤 경우에 상위 담당자 또는 다른 채널로 연결하나요? (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {escalationCriteriaOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedEscalationCriteria.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedEscalationCriteria, onEscalationCriteriaChange)}
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

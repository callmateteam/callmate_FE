"use client";

import SurveyStepSection from "@/components/common/SurveyStepSection";

interface Step3CSupportProps {
  selectedProblemTypes: string[];
  selectedResolutionSteps: string[];
  selectedCompensationScope: string[];
  selectedEscalationCriteria: string[];
  onProblemTypesChange: (value: string[]) => void;
  onResolutionStepsChange: (value: string[]) => void;
  onCompensationScopeChange: (value: string[]) => void;
  onEscalationCriteriaChange: (value: string[]) => void;
  activeSection: number;
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
  activeSection,
}: Step3CSupportProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* 3-C-1. 자주 발생하는 문제 유형 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={0}
        tag="[ 불만/문제 해결 ]"
        label="3. 자주 접수되는 문제 유형을 선택해주세요. *"
        options={problemTypeOptions}
        selectedIds={selectedProblemTypes}
        onChange={onProblemTypesChange}
        name="support-problem-types"
      />

      {/* 3-C-2. 기본 해결 절차 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={1}
        tag="[ 불만/문제 해결 ]"
        label="4. 문제 대응 시 기본적으로 따르는 절차를 선택해주세요. *"
        options={resolutionStepOptions}
        selectedIds={selectedResolutionSteps}
        onChange={onResolutionStepsChange}
        name="support-resolution-steps"
      />

      {/* 3-C-3. 보상 / 대안 제시 가능 범위 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={2}
        tag="[ 불만/문제 해결 ]"
        label="5. 제안 가능한 대응 범위를 선택해주세요.  *"
        options={compensationScopeOptions}
        selectedIds={selectedCompensationScope}
        onChange={onCompensationScopeChange}
        name="support-compensation-scope"
      />

      {/* 3-C-4. 에스컬레이션 기준 */}
      <SurveyStepSection
        activeSection={activeSection}
        sectionIndex={3}
        tag="[ 불만/문제 해결 ]"
        label="6. 상위 담당자·다른 채널 연결 기준을 선택해주세요.  *"
        options={escalationCriteriaOptions}
        selectedIds={selectedEscalationCriteria}
        onChange={onEscalationCriteriaChange}
        name="support-escalation-criteria"
      />
    </div>
  );
}

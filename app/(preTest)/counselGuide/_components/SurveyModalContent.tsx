"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Step1BasicInfo from "./Step1_BasicInfo";
import Step2Purpose from "./Step2_Purpose";
import Step3AInformation from "./Step3A_Information";
import Step3BSales from "./Step3B_Sales";
import Step3CSupport from "./Step3C_Support";
import Step4ToneSettings from "./Step4_ToneSettings";
import type { ConsultationType } from "@/lib/types/analysis";
import type { ToneStyle, ScriptFormRequest } from "@/lib/types/script";

interface SurveyModalContentProps {
  onClose: () => void;
  onSubmit: (data: ScriptFormRequest) => void;
  onStepChange?: (step: number) => void;
}

export default function SurveyModalContent({
  onClose,
  onSubmit,
  onStepChange
}: SurveyModalContentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step3Index, setStep3Index] = useState(0);
  const [step4Index, setStep4Index] = useState(0);

  // Step 1: 기본 정보
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");

  // Step 2: 상담 목적
  const [consultationType, setConsultationType] = useState<ConsultationType | undefined>();

  // Step 3-A: 정보 안내 (consulting)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedKeyPoints, setSelectedKeyPoints] = useState<string[]>([]);
  const [selectedFaqTypes, setSelectedFaqTypes] = useState<string[]>([]);

  // Step 3-B: 영업 (sales)
  const [selectedTargetTypes, setSelectedTargetTypes] = useState<string[]>([]);
  const [selectedKeyEmphasis, setSelectedKeyEmphasis] = useState<string[]>([]);
  const [selectedPricingScope, setSelectedPricingScope] = useState<string[]>([]);
  const [selectedComparisonPoints, setSelectedComparisonPoints] = useState<string[]>([]);
  const [selectedRejectionTypes, setSelectedRejectionTypes] = useState<string[]>([]);

  // Step 3-C: 지원 (cs)
  const [selectedProblemTypes, setSelectedProblemTypes] = useState<string[]>([]);
  const [selectedResolutionSteps, setSelectedResolutionSteps] = useState<string[]>([]);
  const [selectedCompensationScope, setSelectedCompensationScope] = useState<string[]>([]);
  const [selectedEscalationCriteria, setSelectedEscalationCriteria] = useState<string[]>([]);

  // Step 4: 톤 & 멘트 규칙
  const [toneStyle, setToneStyle] = useState<ToneStyle>("formal");
  const [forbiddenPhrase, setForbiddenPhrase] = useState("");
  const [requiredPhrase, setRequiredPhrase] = useState("");
  const [keyPhrase, setKeyPhrase] = useState("");

  const totalSteps = 4;
  const getStep3Total = (type: ConsultationType | undefined) => {
    if (type === "information") return 3;
    if (type === "sales") return 4;
    if (type === "complaint") return 4;
    return 0;
  };
  const getStep4Total = () => 4;

  useEffect(() => {
    setStep3Index(0);
  }, [consultationType]);

  useEffect(() => {
    if (currentStep === 4) {
      setStep4Index(0);
    }
  }, [currentStep]);

  // currentStep이 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    // 유효성 검사
    if (currentStep === 1 && !companyName.trim()) {
      alert("회사명을 입력해주세요.");
      return;
    }
    if (currentStep === 2 && !consultationType) {
      alert("상담 목적을 선택해주세요.");
      return;
    }

    if (currentStep === 3) {
      const step3Total = getStep3Total(consultationType);
      if (step3Index < step3Total - 1) {
        setStep3Index(step3Index + 1);
        return;
      }
    }

    if (currentStep === 4) {
      const step4Total = getStep4Total();
      if (step4Index < step4Total - 1) {
        setStep4Index(step4Index + 1);
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 3 && step3Index > 0) {
      setStep3Index(step3Index - 1);
      return;
    }

    if (currentStep === 4 && step4Index > 0) {
      setStep4Index(step4Index - 1);
      return;
    }

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!consultationType) {
      alert("상담 목적을 선택해주세요.");
      return;
    }

    // 쉼표로 분리된 문자열을 배열로 변환
    const parsePhrases = (phrase: string): string[] => {
      return phrase
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
    };

    // 데이터 변환
    const formData: ScriptFormRequest = {
      company_name: companyName,
      consultation_type: consultationType,
      tone_settings: {
        tone_style: toneStyle,
        forbidden_phrases: parsePhrases(forbiddenPhrase),
        required_phrases: parsePhrases(requiredPhrase),
        key_phrases: parsePhrases(keyPhrase),
      },
    };

    // 상담 유형별 세부 정보 추가 (선택형 데이터를 문자열 배열로 변환)
    if (consultationType === "sales") {
      formData.sales_details = {
        product_name: productName || "",
        key_features: selectedKeyEmphasis,
        competitive_advantages: selectedComparisonPoints,
        pricing_info: selectedPricingScope,
        objection_responses: selectedRejectionTypes.map((type) => ({
          objection: type,
          response: "", // 백엔드에서 생성 가능
        })),
      };
    } else if (consultationType === "information") {
      formData.information_details = {
        product_name: productName || "",
        common_inquiries: selectedFaqTypes.map((type) => ({
          question: type,
          answer: "", // 백엔드에서 생성 가능
        })),
        department_info: selectedTypes,
        process_guides: selectedKeyPoints,
      };
    } else if (consultationType === "complaint") {
      formData.support_details = {
        product_name: productName || "",
        common_problems: selectedProblemTypes,
        compensation_options: selectedCompensationScope,
        escalation_criteria: selectedEscalationCriteria,
      };
    }

    console.log("📤 폼 제출 데이터:", JSON.stringify(formData, null, 2));
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            companyName={companyName}
            productName={productName}
            onCompanyNameChange={setCompanyName}
            onProductNameChange={setProductName}
          />
        );
      case 2:
        return (
          <Step2Purpose selectedPurpose={consultationType} onPurposeChange={setConsultationType} />
        );
      case 3:
        if (consultationType === "information") {
          return (
            <Step3AInformation
              selectedTypes={selectedTypes}
              selectedKeyPoints={selectedKeyPoints}
              selectedFaqTypes={selectedFaqTypes}
              onTypesChange={setSelectedTypes}
              onKeyPointsChange={setSelectedKeyPoints}
              onFaqTypesChange={setSelectedFaqTypes}
              activeSection={step3Index}
            />
          );
        } else if (consultationType === "sales") {
          return (
            <Step3BSales
              selectedTargetTypes={selectedTargetTypes}
              selectedKeyEmphasis={selectedKeyEmphasis}
              selectedPricingScope={selectedPricingScope}
              selectedComparisonPoints={selectedComparisonPoints}
              selectedRejectionTypes={selectedRejectionTypes}
              onTargetTypesChange={setSelectedTargetTypes}
              onKeyEmphasisChange={setSelectedKeyEmphasis}
              onPricingScopeChange={setSelectedPricingScope}
              onComparisonPointsChange={setSelectedComparisonPoints}
              onRejectionTypesChange={setSelectedRejectionTypes}
              activeSection={step3Index}
            />
          );
        } else if (consultationType === "complaint") {
          return (
            <Step3CSupport
              selectedProblemTypes={selectedProblemTypes}
              selectedResolutionSteps={selectedResolutionSteps}
              selectedCompensationScope={selectedCompensationScope}
              selectedEscalationCriteria={selectedEscalationCriteria}
              onProblemTypesChange={setSelectedProblemTypes}
              onResolutionStepsChange={setSelectedResolutionSteps}
              onCompensationScopeChange={setSelectedCompensationScope}
              onEscalationCriteriaChange={setSelectedEscalationCriteria}
              activeSection={step3Index}
            />
          );
        }
        return null;
      case 4:
        return (
          <Step4ToneSettings
            toneStyle={toneStyle}
            forbiddenPhrase={forbiddenPhrase}
            requiredPhrase={requiredPhrase}
            keyPhrase={keyPhrase}
            onToneStyleChange={setToneStyle}
            onForbiddenPhraseChange={setForbiddenPhrase}
            onRequiredPhraseChange={setRequiredPhrase}
            onKeyPhraseChange={setKeyPhrase}
            activeSection={step4Index}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 현재 스텝 렌더링 */}
      <div className="min-h-100">{renderStep()}</div>

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-3">
        <button onClick={onClose} className="text-label-l text-error-500 cursor-pointer">
          나가기
        </button>
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button variant="outlined" onClick={handlePrevious}>
              이전
            </Button>
          )}
          {currentStep < totalSteps ||
          (currentStep === totalSteps && step4Index < getStep4Total() - 1) ? (
            <Button variant="primary" onClick={handleNext}>
              다음
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

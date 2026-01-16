"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import SurveyModalContent from "@/app/(preTest)/counselGuide/_components/SurveyModalContent";
import type { ScriptFormRequest } from "@/lib/types/script";

interface CounselGuideSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScriptFormRequest) => void;
}

export default function CounselGuideSurveyModal({
  isOpen,
  onClose,
  onSubmit,
}: CounselGuideSurveyModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="상담 가이드 작성"
      currentStep={currentStep}
      totalSteps={4}
    >
      <SurveyModalContent onClose={onClose} onSubmit={onSubmit} onStepChange={setCurrentStep} />
    </Modal>
  );
}

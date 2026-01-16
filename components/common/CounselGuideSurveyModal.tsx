"use client";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="상담 가이드 작성">
      <SurveyModalContent onClose={onClose} onSubmit={onSubmit} />
    </Modal>
  );
}

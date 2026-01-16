"use client";

import SurveyInput from "@/components/common/SurveyInput";

interface Step1BasicInfoProps {
  companyName: string;
  onCompanyNameChange: (value: string) => void;
}

/**
 * Step 1: 기본 정보 입력
 */
export default function Step1BasicInfo({ companyName, onCompanyNameChange }: Step1BasicInfoProps) {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-title-l text-neutral-900">1. 회사명을 입력해주세요</h3>

      <SurveyInput
        placeholder="개인일 경우 이름을, 회사일 경우 회사명을 입력해주세요."
        value={companyName}
        onChange={(e) => onCompanyNameChange(e.target.value)}
      />
    </div>
  );
}

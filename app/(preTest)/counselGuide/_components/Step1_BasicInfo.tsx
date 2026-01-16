"use client";

import SurveyInput from "@/components/common/SurveyInput";

interface Step1BasicInfoProps {
  companyName: string;
  productName: string;
  onCompanyNameChange: (value: string) => void;
  onProductNameChange: (value: string) => void;
}

/**
 * Step 1: 기본 정보 입력
 */
export default function Step1BasicInfo({
  companyName,
  productName,
  onCompanyNameChange,
  onProductNameChange,
}: Step1BasicInfoProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-title-l text-neutral-900">1. 기본 정보를 입력해주세요</h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-body-l text-neutral-700">회사명 *</label>
            <SurveyInput
              placeholder="개인일 경우 이름을, 회사일 경우 회사명을 입력해주세요."
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-body-l text-neutral-700">상품/서비스명 (선택)</label>
            <SurveyInput
              placeholder="예: 가족건강보험, 프리미엄 케어 서비스 등"
              value={productName}
              onChange={(e) => onProductNameChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

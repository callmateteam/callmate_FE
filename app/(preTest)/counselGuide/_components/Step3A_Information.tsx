"use client";

import { useState } from "react";

interface Step3AInformationProps {
  selectedTypes: string[];
  selectedKeyPoints: string[];
  selectedFaqTypes: string[];
  onTypesChange: (value: string[]) => void;
  onKeyPointsChange: (value: string[]) => void;
  onFaqTypesChange: (value: string[]) => void;
}

const targetTypeOptions = [
  { id: "service", label: "서비스 / 솔루션" },
  { id: "product", label: "제품" },
  { id: "plan", label: "요금제 / 플랜 / 프로그램" },
  { id: "policy", label: "정책 / 제도 / 규정" },
  { id: "general", label: "기타 일반 안내" },
];

const keyPointOptions = [
  { id: "features", label: "주요 기능 또는 구성" },
  { id: "usage", label: "사용 방법 / 절차" },
  { id: "benefits", label: "장점 또는 기대 효과" },
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
}: Step3AInformationProps) {
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

      {/* 3-A-1. 안내 대상 유형 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-A-1. 안내 대상 유형</label>
          <p className="text-body-s text-neutral-500">안내하는 대상의 유형을 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {targetTypeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedTypes, onTypesChange)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-A-2. 주요 특장점 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-A-2. 주요 특장점 (최대 5개)</label>
          <p className="text-body-s text-neutral-500">안내 시 반드시 전달되어야 하는 요소를 선택해주세요.</p>
        </div>
        <div className="flex flex-col gap-2">
          {keyPointOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedKeyPoints.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedKeyPoints, onKeyPointsChange, 5)}
                className="h-5 w-5 cursor-pointer"
              />
              <span className="text-body-m text-neutral-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3-A-3. 자주 묻는 질문 유형 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">3-A-3. 자주 묻는 질문 유형 (FAQ)</label>
          <p className="text-body-s text-neutral-500">안내 중 자주 등장하는 질문 유형을 선택해주세요. (복수 선택)</p>
        </div>
        <div className="flex flex-col gap-2">
          {faqTypeOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                checked={selectedFaqTypes.includes(option.id)}
                onChange={() => toggleSelection(option.id, selectedFaqTypes, onFaqTypesChange)}
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

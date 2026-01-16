"use client";

import SurveyList, { SurveyOption } from "@/components/common/SurveyList";
import SurveyInput from "@/components/common/SurveyInput";
import type { ToneStyle } from "@/lib/types/script";

interface Step4ToneSettingsProps {
  toneStyle: ToneStyle;
  forbiddenPhrase: string;
  requiredPhrase: string;
  keyPhrase: string;
  onToneStyleChange: (value: ToneStyle) => void;
  onForbiddenPhraseChange: (value: string) => void;
  onRequiredPhraseChange: (value: string) => void;
  onKeyPhraseChange: (value: string) => void;
}

const toneOptions: SurveyOption[] = [
  {
    id: "formal",
    title: "격식체",
    description: "정중하고 격식 있는 말투",
  },
  {
    id: "friendly",
    title: "친근체",
    description: "친근하고 편안한 말투",
  },
  {
    id: "professional",
    title: "전문가 스타일",
    description: "전문적이고 신뢰감 있는 말투",
  },
];

/**
 * Step 4: 톤 & 멘트 규칙 설정
 */
export default function Step4ToneSettings({
  toneStyle,
  forbiddenPhrase,
  requiredPhrase,
  keyPhrase,
  onToneStyleChange,
  onForbiddenPhraseChange,
  onRequiredPhraseChange,
  onKeyPhraseChange,
}: Step4ToneSettingsProps) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-title-l text-neutral-900">4. 톤 & 멘트 규칙 설정</h3>

      {/* 4-1. 말투 스타일 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">4-1. 말투 스타일</label>
          <p className="text-body-s text-neutral-500">
            이 대화에서 AI가 유지해야 할 말투 스타일을 선택해주세요.
          </p>
        </div>
        <SurveyList
          options={toneOptions}
          selectedId={toneStyle}
          onChange={(id) => onToneStyleChange(id as ToneStyle)}
          name="tone-style"
        />
      </div>

      {/* 4-2. 피해야 할 표현 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">4-2. 피해야 할 표현</label>
          <p className="text-body-s text-neutral-500">
            대화 중 사용하지 않았으면 하는 표현이 있다면 입력해주세요.
          </p>
          <p className="text-body-xs text-neutral-400">예: "안됩니다", "불가능합니다", "규정상 어렵습니다"</p>
        </div>
        <SurveyInput
          placeholder="쉼표(,)로 구분하여 입력 (예: 안됩니다, 불가능합니다)"
          value={forbiddenPhrase}
          onChange={(e) => onForbiddenPhraseChange(e.target.value)}
        />
      </div>

      {/* 4-3. 반드시 포함할 표현 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">4-3. 반드시 포함할 표현</label>
          <p className="text-body-s text-neutral-500">
            대화 중 포함되었으면 하는 표현이 있다면 입력해주세요.
          </p>
          <p className="text-body-xs text-neutral-400">예: "고객님", "감사합니다", "불편을 드려 죄송합니다"</p>
        </div>
        <SurveyInput
          placeholder="쉼표(,)로 구분하여 입력 (예: 고객님, 감사합니다)"
          value={requiredPhrase}
          onChange={(e) => onRequiredPhraseChange(e.target.value)}
        />
      </div>

      {/* 4-4. 핵심 강조 문구 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">4-4. 핵심 강조 문구</label>
          <p className="text-body-s text-neutral-500">
            특히 강조하고 싶은 문구가 있다면 입력해주세요.
          </p>
          <p className="text-body-xs text-neutral-400">예: "상담 품질을 자동으로 관리할 수 있습니다"</p>
        </div>
        <SurveyInput
          placeholder="강조하고 싶은 핵심 문구 입력"
          value={keyPhrase}
          onChange={(e) => onKeyPhraseChange(e.target.value)}
        />
      </div>
    </div>
  );
}

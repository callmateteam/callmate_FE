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
  activeSection: number;
}

const toneOptions: SurveyOption[] = [
  {
    id: "formal",
    title: "격식체",
    description: "정중하고 공식적인 말투",
  },
  {
    id: "friendly",
    title: "친근체",
    description: "부드럽고 편안한 말투",
  },
  {
    id: "professional",
    title: "전문가체",
    description: "전문적이고 자신감 있는 말투",
  },
];

export default function Step4ToneSettings({
  toneStyle,
  forbiddenPhrase,
  requiredPhrase,
  keyPhrase,
  onToneStyleChange,
  onForbiddenPhraseChange,
  onRequiredPhraseChange,
  onKeyPhraseChange,
  activeSection,
}: Step4ToneSettingsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className={`flex flex-col gap-4 ${activeSection === 0 ? "" : "hidden"}`}>
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">
            Q. 대화에서 AI가 유지해야 할 말투 스타일을 선택해주세요.
          </label>
        </div>
        <SurveyList
          options={toneOptions}
          selectedId={toneStyle}
          onChange={(id) => onToneStyleChange(id as ToneStyle)}
          name="tone-style"
        />
      </div>

      <div className={`flex flex-col gap-4 ${activeSection === 1 ? "" : "hidden"}`}>
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">
            Q. 대화 중 사용하지 않았으면 하는 표현이 있다면 입력해주세요.
          </label>
        </div>
        <SurveyInput
          placeholder="입력 예시: “안됩니다”, “불가능합니다.”, “규정상 어렵습니다.”"
          value={forbiddenPhrase}
          onChange={(e) => onForbiddenPhraseChange(e.target.value)}
        />
      </div>

      <div className={`flex flex-col gap-4 ${activeSection === 2 ? "" : "hidden"}`}>
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">
            Q. 대화 중 포함되었으면 하는 표현이 있다면 입력해주세요.
          </label>
        </div>
        <SurveyInput
          placeholder="입력 예시: “고객님”, “감사합니다.”, “불편을 드려 죄송합니다.”"
          value={requiredPhrase}
          onChange={(e) => onRequiredPhraseChange(e.target.value)}
        />
      </div>

      <div className={`flex flex-col gap-4 ${activeSection === 3 ? "" : "hidden"}`}>
        <div className="flex flex-col gap-2">
          <label className="text-headline-m text-neutral-900">
            Q. 특히 강조하고 싶은 문구가 있다면 입력해주세요.
          </label>
        </div>
        <SurveyInput
          placeholder="입력 예시: “상담 품질을 자동으로 관리할 수 있습니다.”"
          value={keyPhrase}
          onChange={(e) => onKeyPhraseChange(e.target.value)}
        />
      </div>
    </div>
  );
}

"use client";

import { User } from "lucide-react";
import type { Utterance } from "@/lib/types/transcription";

interface SpeakerSelectionModalProps {
  isOpen: boolean;
  speakers: string[];
  utterances: Utterance[];
  onSelectSpeaker: (speaker: string) => void;
}

/**
 * 화자 선택 모달 컴포넌트
 * 전체 스켈레톤 로딩 중에 표시되며, 사용자가 자신의 화자를 선택하도록 함
 */
export default function SpeakerSelectionModal({
  isOpen,
  speakers,
  utterances,
  onSelectSpeaker,
}: SpeakerSelectionModalProps) {
  if (!isOpen) return null;

  // 각 화자의 대화 내용 3줄 추출
  const getSpeakerPreview = (speaker: string) => {
    return utterances
      .filter((u) => u.speaker === speaker)
      .slice(0, 3)
      .map((u) => u.text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
        {/* 제목 */}
        <h2 className="text-title-l text-neutral-900">통화에서 본인의 말을 선택해주세요.</h2>

        {/* 설명 */}
        <p className="text-body-m mt-3 text-neutral-600">Hi 단계를 거치면 분석 생성을 더 놓아요.</p>

        {/* 화자 선택 버튼들 */}
        <div className="mt-8 flex gap-4">
          {speakers.map((speaker) => {
            const preview = getSpeakerPreview(speaker);
            return (
              <button
                key={speaker}
                onClick={() => onSelectSpeaker(speaker)}
                className="hover:border-accent-400 hover:bg-accent-50 flex flex-1 cursor-pointer flex-col items-start gap-4 rounded-xl border-2 border-neutral-300 bg-white p-6 text-left transition-all"
              >
                {/* 화자 정보 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                    <User className="h-5 w-5 text-neutral-600" />
                  </div>
                  <span className="text-body-l font-medium text-neutral-900">화자 {speaker}</span>
                </div>

                {/* 대화 미리보기 */}
                <div className="flex w-full flex-col gap-2">
                  {preview.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-body-s line-clamp-1 text-neutral-600"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

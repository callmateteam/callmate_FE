"use client";

interface SpeakerSelectorProps {
  speakers: string[];
  selectedSpeaker: string;
  onSpeakerChange: (speaker: string) => void;
}

/**
 * 상담사 선택 임시 컴포넌트
 */
export default function SpeakerSelector({
  speakers,
  selectedSpeaker,
  onSpeakerChange,
}: SpeakerSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-body-m text-neutral-700">상담사 :</label>
      <div className="flex gap-2">
        {speakers.map((speaker) => (
          <button
            key={speaker}
            onClick={() => onSpeakerChange(speaker)}
            className={`text-body-m rounded-lg px-4 py-2 transition-colors ${
              selectedSpeaker === speaker
                ? "bg-accent-400 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            화자 {speaker}
          </button>
        ))}
      </div>
    </div>
  );
}

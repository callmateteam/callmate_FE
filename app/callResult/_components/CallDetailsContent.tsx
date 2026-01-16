"use client";

import { useState } from "react";
import SearchInput from "@/components/common/SearchInput";
import SttBox from "@/components/common/SttBox";
import { useSearchUtterances } from "@/lib/hooks/useSearchUtterances";
import { formatTime } from "@/lib/utils/timeFormat";
import type { Utterance } from "@/lib/types/transcription";

interface CallDetailsContentProps {
  utterances: Utterance[];
  isLoading?: boolean;
}

/**
 * 통화 내용 표시 컴포넌트 (모바일/데스크톱 공통)
 */
export default function CallDetailsContent({ utterances }: CallDetailsContentProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredUtterances = useSearchUtterances(utterances, searchKeyword);

  if (utterances.length === 0) {
    return (
      <div className="mt-5 flex flex-col items-center justify-center py-20">
        <p className="text-body-l text-neutral-400">통화 내용이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <SearchInput value={searchKeyword} onChange={setSearchKeyword} />

      <div className="mt-4 flex flex-col gap-2">
        {filteredUtterances.length === 0 ? (
          <p className="text-body-m py-10 text-center text-neutral-400">
            검색 결과가 없습니다.
          </p>
        ) : (
          filteredUtterances.map((utterance, idx) => (
            <SttBox
              key={`${utterance.speaker}-${utterance.start}-${idx}`}
              stt={utterance.speaker === "A" ? "me" : "client"}
              text={utterance.text}
              time={formatTime(utterance.start)}
            />
          ))
        )}
      </div>
    </div>
  );
}

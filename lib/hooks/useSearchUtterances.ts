"use client";

import { useMemo } from "react";
import type { Utterance } from "@/lib/types/transcription";

/**
 * 발화 목록을 검색어로 필터링하는 훅
 * @param utterances - 전체 발화 목록
 * @param searchKeyword - 검색 키워드
 * @returns 필터링된 발화 목록
 */
export const useSearchUtterances = (
  utterances: Utterance[],
  searchKeyword: string
): Utterance[] => {
  return useMemo(() => {
    const trimmedKeyword = searchKeyword.trim().toLowerCase();

    if (!trimmedKeyword) return utterances;

    return utterances.filter((utterance) =>
      utterance.text.toLowerCase().includes(trimmedKeyword)
    );
  }, [utterances, searchKeyword]);
};

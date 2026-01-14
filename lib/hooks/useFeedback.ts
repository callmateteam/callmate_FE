"use client";

import { useQuery } from "@tanstack/react-query";
import { requestFeedback } from "@/lib/api/analysis";
import { getScriptContext } from "@/lib/utils/storage";
import type { Utterance } from "@/lib/types/transcription";
import type { FeedbackResponse } from "@/lib/types/analysis";

interface UseFeedbackParams {
  utterances: Utterance[];
  speakers: string[];
  mySpeaker?: string; // 상담원 화자 ID (기본 "A")
}

/**
 * 응대 피드백을 가져오는 훅 (React Query 버전)
 */
export const useFeedback = ({
  utterances,
  speakers,
  mySpeaker = "A",
}: UseFeedbackParams) => {
  return useQuery<FeedbackResponse, Error>({
    queryKey: ["feedback", utterances, speakers, mySpeaker],
    queryFn: () => {
      // localStorage에서 스크립트 컨텍스트 조회
      const scriptContext = getScriptContext();

      return requestFeedback({
        utterances,
        speakers,
        my_speaker: mySpeaker,
        consultation_type: scriptContext?.consultation_type || "sales",
        script_context: scriptContext?.prompt_context,
      });
    },
    enabled: utterances.length > 0, // utterances가 있을 때만 실행
    staleTime: Infinity, // 데이터가 변하지 않으므로 무한 캐싱
    gcTime: 30 * 60 * 1000, // 30분간 캐시 유지
    retry: 2, // 2번 재시도
  });
};

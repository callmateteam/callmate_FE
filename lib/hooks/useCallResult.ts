"use client";

import { useState, useEffect } from "react";
import { getCurrentTranscription } from "@/lib/utils/storage";
import type { SavedTranscription } from "@/lib/types/transcription";

interface UseCallResultReturn {
  transcription: SavedTranscription | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * 현재 저장된 통화 결과를 조회하는 훅
 */
export const useCallResult = (): UseCallResultReturn => {
  const [transcription, setTranscription] = useState<SavedTranscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = getCurrentTranscription();

      if (!data) {
        setError("저장된 통화 결과가 없습니다.");
      } else {
        setTranscription(data);
      }
    } catch (err) {
      setError("통화 결과를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { transcription, isLoading, error };
};

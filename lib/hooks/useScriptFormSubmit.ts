/**
 * 스크립트 폼 제출 React Query 훅
 */

import { useMutation } from "@tanstack/react-query";
import { submitScriptForm } from "@/lib/api/script";
import { saveScriptContext } from "@/lib/utils/storage";
import type { ScriptFormRequest, ScriptExtractionResponse } from "@/lib/types/script";

interface UseScriptFormSubmitOptions {
  onSuccess?: (data: ScriptExtractionResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * 스크립트 폼 제출 훅
 */
export const useScriptFormSubmit = ({ onSuccess, onError }: UseScriptFormSubmitOptions = {}) => {
  return useMutation({
    mutationFn: (formData: ScriptFormRequest) => submitScriptForm(formData),
    onSuccess: (data) => {
      // localStorage에 저장
      const saved = saveScriptContext({
        prompt_context: data.prompt_context,
        filename: "직접 작성",
        createdAt: new Date().toISOString(),
        consultation_type: data.extracted.consultation_type,
      });

      if (saved) {
        onSuccess?.(data);
      } else {
        onError?.(new Error("스크립트 컨텍스트 저장에 실패했습니다."));
      }
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
};

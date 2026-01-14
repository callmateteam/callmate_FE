"use client";

import { useMutation } from "@tanstack/react-query";
import { extractScriptFromPdf } from "@/lib/api/script";
import { saveScriptContext } from "@/lib/utils/storage";
import type { ScriptExtractionResponse } from "@/lib/types/script";

interface UseScriptUploadParams {
  onSuccess?: (data: ScriptExtractionResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * 스크립트 PDF 업로드 훅
 */
export const useScriptUpload = ({
  onSuccess,
  onError,
}: UseScriptUploadParams = {}) => {
  return useMutation<
    ScriptExtractionResponse,
    Error,
    { file: File; companyName?: string }
  >({
    mutationFn: ({ file, companyName }) => extractScriptFromPdf(file, companyName),
    onSuccess: (data, variables) => {
      // localStorage에 자동 저장
      const saved = saveScriptContext({
        prompt_context: data.prompt_context,
        filename: variables.file.name,
        createdAt: new Date().toISOString(),
        consultation_type: data.extracted.consultation_type,
      });

      if (saved) {
        onSuccess?.(data);
      } else {
        onError?.(new Error("저장에 실패했습니다."));
      }
    },
    onError,
  });
};

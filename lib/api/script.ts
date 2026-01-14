/**
 * 스크립트 추출 API 호출 함수
 */

import type { ScriptExtractionResponse } from "@/lib/types/script";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * PDF에서 스크립트 추출
 * @param file - PDF 파일
 * @param companyName - 회사명 (선택)
 * @returns 추출된 스크립트 데이터
 */
export const extractScriptFromPdf = async (
  file: File,
  companyName?: string
): Promise<ScriptExtractionResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  if (companyName) {
    formData.append("company_name", companyName);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/scripts/extract/pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.detail?.[0]?.msg || `스크립트 추출 실패: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

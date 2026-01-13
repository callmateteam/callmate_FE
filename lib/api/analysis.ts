/**
 * AI 분석 API 호출 함수
 */

import type { SummaryRequest, SummaryResponse } from "@/lib/types/analysis";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * AI 요약 API 호출
 * @param request - 요약 요청 데이터
 * @returns AI 요약 응답
 */
export const requestAiSummary = async (request: SummaryRequest): Promise<SummaryResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/analysis/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    // 에러 응답 파싱 시도
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail?.[0]?.msg || `AI 요약 요청 실패: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
};

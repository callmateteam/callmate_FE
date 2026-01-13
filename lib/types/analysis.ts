/**
 * AI 분석 관련 타입 정의
 */

import type { Utterance } from "./transcription";

// 상담 유형
export type ConsultationType = "sales" | "cs" | "consulting";

// 고객 상태
export type CustomerState = "관심 있음" | "고민 중" | "거부" | "보류" | "기타";

// AI 요약 요청
export interface SummaryRequest {
  utterances: Utterance[];
  speakers: string[];
  my_speaker: string; // 상담원 화자 ID
  script_context?: string; // 스크립트 컨텍스트
  consultation_type: ConsultationType;
}

// AI 요약 응답
export interface SummaryResponse {
  transcript_id: string;
  summary: string; // 90자 이내 요약
  customer_state: CustomerState;
}

// 응대 피드백 아이템 (향후 확장용)
export interface FeedbackItem {
  category?: string;
  title: string;
  subtext: string;
  recommend?: boolean;
}

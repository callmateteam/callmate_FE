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

// 피드백 타입
export type FeedbackType =
  | "loss_emphasis" // 손실 강조
  | "gain_emphasis" // 이득 강조
  | "social_proof" // 사회적 증거
  | "scarcity" // 희소성
  | "reciprocity" // 상호성
  | "authority"; // 권위

// 피드백 아이템
export interface FeedbackItem {
  type: FeedbackType;
  title: string;
  content: string;
}

// 피드백 요청 (summary와 동일한 구조)
export interface FeedbackRequest {
  utterances: Utterance[];
  speakers: string[];
  my_speaker: string; // 상담원 화자 ID
  script_context?: string; // 스크립트 컨텍스트
  consultation_type: ConsultationType;
}

// 피드백 응답
export interface FeedbackResponse {
  transcript_id: string;
  consultation_type: string;
  feedbacks: FeedbackItem[]; // 3개의 추천 멘트
}

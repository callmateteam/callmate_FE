/**
 * 스크립트 관련 타입 정의
 */

import type { ConsultationType } from "./analysis";

// 톤 & 스타일
export type ToneStyle = "formal" | "casual" | "friendly" | "professional";

// FAQ 항목
export interface FaqItem {
  question: string;
  answer: string;
}

// 이의 제기 응답
export interface ObjectionResponse {
  objection: string;
  response: string;
}

// 추출된 스크립트 데이터
export interface ExtractedScript {
  company_name: string;
  consultation_type: ConsultationType;
  product_name: string;
  key_features: string[];
  faq: FaqItem[];
  pricing_info: string[];
  competitive_advantages: string[];
  objection_responses: ObjectionResponse[];
  common_problems: string[];
  compensation_options: string[];
  escalation_criteria: string[];
  tone_style: ToneStyle;
  forbidden_phrases: string[];
  required_phrases: string[];
  key_phrases: string[];
}

// API 응답
export interface ScriptExtractionResponse {
  success: boolean;
  input_type: "pdf" | "text";
  extracted: ExtractedScript;
  prompt_context: string; // AI 분석에 사용될 컨텍스트
  metadata?: Record<string, unknown>;
}

// localStorage 저장 형식
export interface SavedScriptContext {
  prompt_context: string;
  filename: string;
  createdAt: string;
  consultation_type: ConsultationType; // 추출된 상담 유형
}

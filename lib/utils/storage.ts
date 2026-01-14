/**
 * 전사 결과 로컬 저장 관리 (단일 항목)
 */

import type { SavedTranscription, TranscriptionData } from "@/lib/types/transcription";
import type { SavedScriptContext } from "@/lib/types/script";

const STORAGE_KEY = "callmate_current_transcription";
const SCRIPT_CONTEXT_KEY = "callmate_script_context";

/**
 * 전사 결과 저장 (기존 데이터 덮어쓰기)
 */
export const saveTranscription = (
  filename: string,
  data: TranscriptionData
): SavedTranscription => {
  const savedItem: SavedTranscription = {
    id: data.transcript_id || `transcript_${Date.now()}`,
    filename,
    data,
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItem));
    return savedItem;
  } catch (error) {
    console.error("전사 결과 저장 실패:", error);
    throw new Error("저장 공간이 부족합니다.");
  }
};

/**
 * 현재 저장된 전사 결과 조회
 */
export const getCurrentTranscription = (): SavedTranscription | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as SavedTranscription;
    return parsed;
  } catch (error) {
    console.error("전사 결과 로드 실패:", error);
    return null;
  }
};

/**
 * 전사 결과 삭제
 */
export const clearTranscription = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("전사 결과 삭제 실패:", error);
    return false;
  }
};

/**
 * 스크립트 컨텍스트 저장 (기존 데이터 덮어쓰기)
 */
export const saveScriptContext = (context: SavedScriptContext): boolean => {
  try {
    localStorage.setItem(SCRIPT_CONTEXT_KEY, JSON.stringify(context));
    return true;
  } catch (error) {
    console.error("스크립트 컨텍스트 저장 실패:", error);
    return false;
  }
};

/**
 * 스크립트 컨텍스트 조회
 */
export const getScriptContext = (): SavedScriptContext | null => {
  try {
    const stored = localStorage.getItem(SCRIPT_CONTEXT_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as SavedScriptContext;
    return parsed;
  } catch (error) {
    console.error("스크립트 컨텍스트 조회 실패:", error);
    return null;
  }
};

/**
 * 스크립트 컨텍스트 삭제
 */
export const clearScriptContext = (): boolean => {
  try {
    localStorage.removeItem(SCRIPT_CONTEXT_KEY);
    return true;
  } catch (error) {
    console.error("스크립트 컨텍스트 삭제 실패:", error);
    return false;
  }
};

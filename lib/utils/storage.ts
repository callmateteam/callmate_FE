/**
 * 전사 결과 로컬 저장 관리
 */

import type { SavedTranscription, TranscriptionData } from "@/lib/types/transcription";

const STORAGE_KEY = "callmate_transcriptions";
const MAX_STORED_ITEMS = 10; // 최대 저장 개수

/**
 * 전사 결과 저장
 */
export const saveTranscription = (
  filename: string,
  data: TranscriptionData
): SavedTranscription => {
  const savedItem: SavedTranscription = {
    id: data.transcript_id,
    filename,
    data,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = getStoredTranscriptions();
    const updated = [savedItem, ...existing].slice(0, MAX_STORED_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return savedItem;
  } catch (error) {
    console.error("전사 결과 저장 실패:", error);
    throw new Error("저장 공간이 부족합니다.");
  }
};

/**
 * 저장된 전사 결과 목록 조회
 */
export const getStoredTranscriptions = (): SavedTranscription[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as SavedTranscription[];
    return parsed;
  } catch (error) {
    console.error("전사 결과 로드 실패:", error);
    return [];
  }
};

/**
 * 특정 전사 결과 조회
 */
export const getTranscriptionById = (id: string): SavedTranscription | null => {
  const stored = getStoredTranscriptions();
  return stored.find((item) => item.id === id) || null;
};

/**
 * 특정 전사 결과 삭제
 */
export const deleteTranscription = (id: string): boolean => {
  try {
    const stored = getStoredTranscriptions();
    const filtered = stored.filter((item) => item.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("전사 결과 삭제 실패:", error);
    return false;
  }
};

/**
 * 모든 전사 결과 삭제
 */
export const clearAllTranscriptions = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("전사 결과 전체 삭제 실패:", error);
    return false;
  }
};

/**
 * 오래된 전사 결과 자동 정리 (30일 이상)
 */
export const cleanupOldTranscriptions = (): number => {
  const stored = getStoredTranscriptions();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filtered = stored.filter((item) => {
    const createdDate = new Date(item.createdAt);
    return createdDate > thirtyDaysAgo;
  });

  const removedCount = stored.length - filtered.length;

  if (removedCount > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("오래된 전사 결과 정리 실패:", error);
    }
  }

  return removedCount;
};

/**
 * 시간 포맷팅 유틸리티
 */

/**
 * 밀리초를 "MM:SS" 형식으로 변환
 * @param ms - 밀리초
 * @returns "MM:SS" 형식 문자열
 * @example
 * formatTime(65000) // "01:05"
 * formatTime(600000) // "10:00"
 */
export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

/**
 * 밀리초를 "X분 Y초" 형식으로 변환
 * @param ms - 밀리초
 * @returns "X분 Y초" 형식 문자열
 * @example
 * formatDuration(65000) // "1분 5초"
 * formatDuration(60000) // "1분"
 * formatDuration(5000) // "5초"
 */
export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) return `${seconds}초`;
  if (seconds === 0) return `${minutes}분`;
  return `${minutes}분 ${seconds}초`;
};

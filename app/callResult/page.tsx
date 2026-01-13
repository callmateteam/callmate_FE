"use client";

import { useCallResult } from "@/lib/hooks/useCallResult";
import ResultHeading from "./_components/ResultHeading";
import DesktopMain from "./_components/desktop/DesktopMain";
import MobileMain from "./_components/mobile/MobileMain";
import { formatDuration } from "@/lib/utils/timeFormat";

export default function CallResultPage() {
  const { transcription, isLoading, error } = useCallResult();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-body-l text-neutral-400">로딩 중...</p>
      </div>
    );
  }

  if (error || !transcription) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <p className="text-body-l text-neutral-900">
          {error || "통화 결과를 찾을 수 없습니다."}
        </p>
        <p className="text-body-s text-neutral-400">먼저 통화 파일을 업로드해주세요.</p>
      </div>
    );
  }

  // 고객 이름 추출 (TODO: 실제 고객명 로직 추가 필요)
  const customerName = "고객";

  return (
    <>
      {/* 공통 헤더 - 모바일/데스크톱 모두 표시 */}
      <div className="px-5 pt-7 lg:px-10 lg:pt-10">
        <ResultHeading
          name={customerName}
          totalTime={formatDuration(transcription.data.duration || 0)}
        />
      </div>

      {/* 모바일 뷰 */}
      <div className="block px-5 pb-7 lg:hidden">
        <MobileMain transcription={transcription} />
      </div>

      {/* 데스크톱 뷰 */}
      <div className="hidden px-10 pb-10 lg:block">
        <DesktopMain transcription={transcription} />
      </div>
    </>
  );
}

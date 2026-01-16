"use client";

import { useState } from "react";
import { useCallResult } from "@/lib/hooks/useCallResult";
import { useAiSummary } from "@/lib/hooks/useAiSummary";
import { useFeedback } from "@/lib/hooks/useFeedback";
import ResultHeading from "./_components/ResultHeading";
import DesktopMain from "./_components/desktop/DesktopMain";
import MobileMain from "./_components/mobile/MobileMain";
import ProcessingStatus from "@/app/(preTest)/callAnalytics/_components/ProcessingStatus";
import SpeakerSelectionModal from "./_components/SpeakerSelectionModal";
import SelectionConfirmedModal from "./_components/SelectionConfirmedModal";
import { formatDuration } from "@/lib/utils/timeFormat";

export default function CallResultPage() {
  const [selectedSpeaker, setSelectedSpeaker] = useState("A");
  const [isSpeakerSelected, setIsSpeakerSelected] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { transcription, isLoading: isTranscriptionLoading, error } = useCallResult();

  // transcription이 로드된 후 API 호출
  const speakers = transcription?.data.speakers || ["A", "B"]; // localStorage에서 speakers 가져오기
  const utterances = transcription?.data.utterances || [];

  const {
    data: summary,
    isLoading: isSummaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useAiSummary({
    utterances,
    speakers,
    mySpeaker: "A",
  });

  const {
    data: feedback,
    isLoading: isFeedbackLoading,
    error: feedbackError,
    refetch: refetchFeedback,
  } = useFeedback({
    utterances,
    speakers,
    mySpeaker: selectedSpeaker,
  });

  // 화자 선택 핸들러
  const handleSpeakerSelect = (speaker: string) => {
    setSelectedSpeaker(speaker);
    setIsSpeakerSelected(true);
    setShowConfirmation(true);

    // 1초 후 확인 모달 닫기
    setTimeout(() => {
      setShowConfirmation(false);
    }, 1000);
  };

  // 전체 로딩 상태 (transcription + AI API + 화자 미선택)
  const isLoadingAll =
    isTranscriptionLoading || isSummaryLoading || isFeedbackLoading || !isSpeakerSelected;

  // transcription 로딩 중
  if (isTranscriptionLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-body-l text-neutral-400">통화 데이터 로딩 중...</p>
      </div>
    );
  }

  if (error || !transcription) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <p className="text-body-l text-neutral-900">{error || "통화 결과를 찾을 수 없습니다."}</p>
        <p className="text-body-s text-neutral-400">먼저 통화 파일을 업로드해주세요.</p>
      </div>
    );
  }

  // 고객 이름 추출 (TODO: 실제 고객명 로직 추가 필요)
  const customerName = "고객";

  return (
    <>
      {/* 공통 헤더 - 모바일/데스크톱 모두 표시 */}
      <div className="mx-auto w-full max-w-7xl px-5 pt-7 md:px-0 lg:pt-10">
        <ResultHeading
          name={customerName}
          totalTime={formatDuration(transcription.data.duration || 0)}
        />
      </div>

      {/* AI API 로딩 중 - 전체 스켈레톤 표시 */}
      {isLoadingAll ? (
        <>
          {/* 통합 스켈레톤 (모바일/데스크톱 공통) */}
          <div className="mx-auto w-full max-w-7xl px-5 pb-7 lg:px-10 lg:pb-10">
            <ProcessingStatus />
          </div>

          {/* 화자 선택 모달 (스켈레톤 위에 표시) */}
          <SpeakerSelectionModal
            isOpen={!isSpeakerSelected}
            speakers={speakers}
            utterances={utterances}
            onSelectSpeaker={handleSpeakerSelect}
          />

          {/* 선택 확인 모달 */}
          <SelectionConfirmedModal isOpen={showConfirmation} />
        </>
      ) : (
        <>
          {/* 모바일 뷰 */}
          <div className="block px-5 pb-7 lg:hidden">
            <MobileMain
              transcription={transcription}
              summary={summary}
              feedback={feedback}
              summaryError={summaryError}
              feedbackError={feedbackError}
              refetchSummary={refetchSummary}
              refetchFeedback={refetchFeedback}
              selectedSpeaker={selectedSpeaker}
              onSpeakerChange={setSelectedSpeaker}
              speakers={speakers}
            />
          </div>

          {/* 데스크톱 뷰 */}
          <div className="hidden px-10 pb-10 lg:block">
            <DesktopMain
              transcription={transcription}
              summary={summary}
              feedback={feedback}
              summaryError={summaryError}
              feedbackError={feedbackError}
              refetchSummary={refetchSummary}
              refetchFeedback={refetchFeedback}
              selectedSpeaker={selectedSpeaker}
              onSpeakerChange={setSelectedSpeaker}
              speakers={speakers}
            />
          </div>
        </>
      )}
    </>
  );
}

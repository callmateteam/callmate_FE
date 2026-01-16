"use client";

import { Check } from "lucide-react";

interface SelectionConfirmedModalProps {
  isOpen: boolean;
}

/**
 * 화자 선택 확인 완료 모달
 * 화자 선택 후 1초간 표시되는 확인 메시지
 */
export default function SelectionConfirmedModal({ isOpen }: SelectionConfirmedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-12 py-10 shadow-xl">
        {/* 체크 아이콘 */}
        <div className="bg-primary-50 flex h-20 w-20 items-center justify-center rounded-full">
          <Check className="h-10 w-10 text-neutral-500" strokeWidth={3} />
        </div>

        {/* 메시지 */}
        <p className="text-title-m text-center text-neutral-900">확인완료요. 분석을 이어갈게요.</p>
      </div>
    </div>
  );
}

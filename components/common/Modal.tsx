"use client";

import { ReactNode, useEffect } from "react";
import NumberBadge from "./NumberBadge";

const tocSteps = [
  { number: 1, label: "기본 정보 입력" },
  { number: 2, label: "대화 목적 선택" },
  { number: 3, label: "대화 기준 설정" },
  { number: 4, label: "톤&멘트 설정(선택)" },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  currentStep?: number;
  totalSteps?: number;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  currentStep = 1,
  totalSteps = 4,
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // 모달 열릴 때 body 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="relative mx-5 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 목차 */}
          <div className="flex items-center justify-between px-10 pt-10 md:gap-4">
            {tocSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isSelected = stepNumber === currentStep;
              return (
                <div key={step.number} className="flex items-center gap-2 md:gap-3">
                  <NumberBadge
                    number={step.number}
                    state={isSelected ? "selected" : "unselected"}
                  />
                  <span
                    className={`text-title-s whitespace-nowrap ${
                      isSelected ? "text-neutral-900" : "text-neutral-400"
                    } ${isSelected ? "inline" : "hidden"} md:inline`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Content */}
          <div className="px-10 pt-18 pb-8">{children}</div>
        </div>
      </div>
    </>
  );
}

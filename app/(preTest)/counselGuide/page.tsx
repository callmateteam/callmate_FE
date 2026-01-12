"use client";

import { useState } from "react";
import FileUploadInput from "@/components/common/FileUploadInput";
import PageHeading from "../_components/PageHeading";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import SurveyModalContent from "./_components/SurveyModalContent";
import { Pencil } from "lucide-react";

export default function CounselGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article>
      <div className="flex flex-col gap-10">
        <PageHeading
          title="상담 가이드 등록"
          desc={`우리 회사 기준으로 분석하고 싶다면\n 상담 가이드를 등록해주세요 (선택사항)`}
        />
        <FileUploadInput
          title="가이드 파일 업로드"
          description="(파일 지원 형식: PDF, DOCS, TXT)"
        />
      </div>
      {/* 구분선 */}
      <div className="relative my-8 flex items-center">
        <div className="grow border-t border-neutral-300" />
        <span className="text-body-m mx-15 shrink-0 text-neutral-400">또는</span>
        <div className="grow border-t border-neutral-300" />
      </div>
      <div className="flex justify-center">
        <Button
          variant="outlined"
          leftIcon={<Pencil className="h-4 w-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          직접 작성하기
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="상담 가이드 작성"
      >
        <SurveyModalContent onClose={() => setIsModalOpen(false)} />
      </Modal>
    </article>
  );
}

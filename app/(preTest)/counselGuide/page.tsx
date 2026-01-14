"use client";

import { useState } from "react";
import FileUploadInput from "@/components/common/FileUploadInput";
import PageHeading from "../_components/PageHeading";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import SurveyModalContent from "./_components/SurveyModalContent";
import { Pencil, Check } from "lucide-react";
import { useScriptUpload } from "@/lib/hooks/useScriptUpload";

export default function CounselGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { mutate: uploadScript, isPending } = useScriptUpload({
    onSuccess: () => {
      setUploadSuccess(true);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleFileSelect = (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0]; // 첫 번째 파일만 사용
    setUploadSuccess(false);
    uploadScript({ file });
  };

  return (
    <article>
      <div className="flex flex-col gap-10">
        <PageHeading
          title="상담 가이드 등록"
          desc={`우리 회사 기준으로 분석하고 싶다면\n 상담 가이드를 등록해주세요 (선택사항)`}
        />

        {/* 업로드 성공 상태 */}
        {uploadSuccess ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-green-400 bg-green-50 px-12 py-18">
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-headline-m text-green-900">등록이 완료되었습니다</p>
              <p className="text-body-m mt-1 text-green-700">
                상담 가이드가 성공적으로 저장되었습니다
              </p>
            </div>
          </div>
        ) : (
          <FileUploadInput
            title="가이드 파일 업로드"
            description="(파일 지원 형식: PDF, DOCS, TXT)"
            accept="application/pdf,.pdf"
            maxSize={10 * 1024 * 1024}
            onFileSelect={handleFileSelect}
            disabled={isPending}
          />
        )}

        {/* 로딩 상태 */}
        {isPending && (
          <div className="flex items-center justify-center py-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-400 border-t-transparent" />
              <p className="text-body-l text-neutral-400">
                PDF에서 스크립트를 추출하는 중...
              </p>
            </div>
          </div>
        )}
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

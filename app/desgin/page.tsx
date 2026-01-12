"use client";

import Button from "@/components/common/Button";
import FeedbackCard from "@/components/common/FeedbackCard";
import FileUploadInput from "@/components/common/FileUploadInput";
import Logo from "@/components/common/Logo";
import NumberBadge from "@/components/common/NumberBadge";
import ProgressBar from "@/components/common/ProgressBar";
import ProgressIndicatorCard from "@/components/common/ProgressIndicatorCard";
import SearchInput from "@/components/common/SearchInput";
import SegmentButton from "@/components/common/SegmentButton";
import SttBox from "@/components/common/SttBox";
import { Pen, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [selectedSegment, setSelectedSegment] = useState("option1");
  return (
    <div className="flex flex-col gap-4">
      <p className="">안녕하세요</p>
      {/* 버튼 */}
      <div className="flex gap-2">
        <Button variant="secondary" leftIcon={<Pencil />} rightIcon={<Pen />}>
          text
        </Button>
        <Button
          variant="primary"
          leftIcon={<Pencil className="h-4 w-4" />}
          rightIcon={<Pen className="h-4 w-4" />}
        >
          text
        </Button>
        <Button
          variant="outlined"
          leftIcon={<Pencil className="h-4 w-4" />}
          rightIcon={<Pen className="h-4 w-4" />}
        >
          text
        </Button>
        <Button
          variant="outlined"
          disabled={true}
          leftIcon={<Pencil className="h-4 w-4" />}
          rightIcon={<Pen className="h-4 w-4" />}
        >
          text
        </Button>
        <Button
          variant="text"
          disabled={true}
          leftIcon={<Pencil className="h-4 w-4" />}
          rightIcon={<Pen className="h-4 w-4" />}
        >
          text
        </Button>
      </div>
      {/* 피드백 카드 */}
      <FeedbackCard title="title" subtext="subtext" />
      {/* 프로그래스바 */}
      <ProgressBar percentage={60} />
      {/* 파일 업로드 */}
      <FileUploadInput error="sdf" />
      {/* 세그먼트 버튼 */}
      <SegmentButton
        options={[
          { label: "button", value: "option1" },
          { label: "button", value: "option2" },
        ]}
        value={selectedSegment}
        onChange={setSelectedSegment}
      />
      {/* 로고 */}
      <Logo />
      {/* 넘버 뱃지 */}
      <div className="flex items-center gap-4">
        <NumberBadge number={1} state="selected" />
        <NumberBadge number={2} state="unselected" />
      </div>

      {/* 카드 모달 */}
      <ProgressIndicatorCard></ProgressIndicatorCard>

      {/* 서치 인풋 */}
      <SearchInput />

      {/* stt box */}
      <SttBox
        stt="client"
        text="저기요, 지난달에 신청한 프리미엄 플랜인데요. 결제가 두 번 된 것 같아서요."
      />
      <SttBox stt="me" text="안녕하세요, 콜메이트 고객센터입니다. 무엇을 도와드릴까요?" />
    </div>
  );
}

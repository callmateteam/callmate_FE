"use client";

import NumberBadge from "@/components/common/NumberBadge";
import { usePathname } from "next/navigation";

export default function PreTestNav() {
  const pathname = usePathname();

  const isCounselGuide = pathname.includes("/counselGuide");
  const isCallAnalytics = pathname.includes("/callAnalytics");

  return (
    <nav
      aria-label="프리테스트 진행 단계"
      className="mt-7 px-5 md:mx-auto md:w-full md:max-w-300 md:p-0"
    >
      <ol className="flex gap-10">
        <li className="flex items-center gap-1">
          <NumberBadge number={1} state={isCounselGuide ? "selected" : "unselected"} />
          <span>우리 회사 상담 가이드 등록</span>
        </li>
        <li className="flex items-center gap-1">
          <NumberBadge number={2} state={isCallAnalytics ? "selected" : "unselected"} />
          <span>통화 녹음 업로드</span>
        </li>
      </ol>
    </nav>
  );
}

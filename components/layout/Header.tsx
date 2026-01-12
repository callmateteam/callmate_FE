"use client";

import { usePathname } from "next/navigation";
import Logo from "../common/Logo";
import Button from "../common/Button";

export default function Header() {
  const pathname = usePathname();
  const logoElement = <Logo clickable />;

  const isAnalysisPage =
    pathname === "/counselGuide" || pathname === "/callAnalytics" || pathname === "/callResult";

  return (
    <header className="bg-neutral-50">
      <div className="mx-auto flex max-w-330 items-center justify-between px-4 py-3 md:px-6 md:py-5">
        <div>{logoElement}</div>
        <nav aria-label="주요 네비게이션">
          <Button variant={isAnalysisPage ? "primary" : "outlined"} href="/counselGuide">
            {isAnalysisPage ? "새 분석 시작" : "시작하기"}
          </Button>
        </nav>
      </div>
    </header>
  );
}

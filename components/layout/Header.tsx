import React from "react";
import Logo from "../common/Logo";
import Button from "../common/Button";

interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage = false }: HeaderProps) {
  const logoElement = <Logo clickable />;

  return (
    <header className="bg-neutral-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-5">
        {isHomePage ? <h1>{logoElement}</h1> : <div>{logoElement}</div>}
        <nav aria-label="주요 네비게이션">
          <Button variant="outlined">시작하기</Button>
        </nav>
      </div>
    </header>
  );
}

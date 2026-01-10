import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-10 px-5 py-10 md:flex-row md:items-center md:justify-center">
      <div className="flex flex-col gap-3 text-[#848484]">
        <p>Callmate</p>
        <p className="text-label-s text-neutral-300">AI가 함께 하는 더 나은 상담 경험</p>
      </div>
      <p className="text-neutral-500">@ 2026 Callmate AI. All rights reserved.</p>
    </footer>
  );
}

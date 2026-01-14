import React from "react";

export default function AiSummaryBorder({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col gap-5 rounded-2xl p-10">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#089182] via-[#819177] to-[#FB923C] p-0.5">
        <div className="h-full w-full rounded-2xl bg-white"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

import React from "react";

interface SttBoxProps {
  stt: "me" | "client";
  time?: string;
  text: string;
}

export default function SttBox({ stt, time = "00:00", text }: SttBoxProps) {
  if (stt === "me") {
    return (
      <div className="flex items-end gap-2 self-end">
        <p className="text-label-m text-[#A6A6A6]">{time}</p>
        <div className="rounded-lg rounded-br-none bg-neutral-100 p-5">
          <p className="text-body-m text-[#1F2937]">{text}</p>
        </div>
      </div>
    );
  } else if (stt === "client") {
    return (
      <div className="flex items-end gap-2 self-start">
        <p className="bg-accent-50 text-title-m text-accent-400 flex h-7 w-7 items-center justify-center rounded-full">
          <span>고</span>
        </p>
        <div className="bg-accent-50 rounded-lg rounded-bl-none p-5">
          <p className="text-body-m text-[#1F2937]">{text}</p>
        </div>
        <p className="text-label-m text-[#A6A6A6]">{time}</p>
      </div>
    );
  }
}

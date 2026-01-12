import { Phone } from "lucide-react";
import React from "react";

interface ResultHeadingProps {
  name: string;
  totalTime: string;
}

export default function ResultHeading({ name, totalTime }: ResultHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h3 className="text-headline-l text-neutral-900">{name} 고객님과의 통화</h3>
      <p className="text-body-l flex items-center gap-1 text-neutral-400">
        <Phone className="h-5 w-5" />
        <span>총 통화 시간 • {totalTime}</span>
      </p>
    </div>
  );
}

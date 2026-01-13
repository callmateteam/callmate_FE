import React from "react";
import type { SavedTranscription } from "@/lib/types/transcription";

interface DesktopMainProps {
  transcription: SavedTranscription;
}

export default function DesktopMain({ transcription }: DesktopMainProps) {
  // TODO: 데스크톱 UI 구현
  return <div>Desktop View (구현 예정)</div>;
}

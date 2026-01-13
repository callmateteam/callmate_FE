"use client";

import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { useState } from "react";

interface ToolbarProps {
  onLike?: () => void;
  onDislike?: () => void;
  onCopy?: () => void;
  className?: string;
}

export default function Toolbar({ onLike, onDislike, onCopy, className }: ToolbarProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const iconSize = 20;

  const iconButtons = [
    {
      id: "like",
      icon: ThumbsUp,
      onClick: onLike,
      label: "좋아요",
    },
    {
      id: "dislike",
      icon: ThumbsDown,
      onClick: onDislike,
      label: "싫어요",
    },
    {
      id: "copy",
      icon: Copy,
      onClick: onCopy,
      label: "복사",
    },
  ];

  return (
    <div
      className={["inline-flex items-center gap-4 rounded-2xl bg-neutral-800 px-6 py-3 h-10 w-27", className]
        .filter(Boolean)
        .join(" ")}
      role="toolbar"
      aria-label="툴바"
    >
      {iconButtons.map((button) => {
        const Icon = button.icon;
        const isHovered = hoveredIcon === button.id;

        return (
          <button
            key={button.id}
            type="button"
            onClick={button.onClick}
            onMouseEnter={() => setHoveredIcon(button.id)}
            onMouseLeave={() => setHoveredIcon(null)}
            className={[
              "transition-all duration-200",
              isHovered ? "text-primary-400 scale-110" : "text-white",
              "focus-visible:ring-primary-500 rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800 focus-visible:outline-none",
            ].join(" ")}
            aria-label={button.label}
          >
            <Icon size={iconSize} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}

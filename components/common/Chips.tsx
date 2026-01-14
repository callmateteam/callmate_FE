"use client";

import React, { useState } from "react";

interface ChipsProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Chips({
  text,
  isSelected = false,
  onClick,
  disabled = false,
  className,
}: ChipsProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // 상태에 따른 스타일 결정
  const getStyles = () => {
    if (disabled) {
      return "bg-neutral-100 text-neutral-400 cursor-not-allowed";
    }

    if (isSelected) {
      return "bg-primary-500 text-white border-2 border-primary-500";
    }

    if (isHovered) {
      return "bg-white text-primary-500 border-2 border-primary-500";
    }

    return "bg-neutral-100 text-neutral-500 border-2 border-transparent";
  };

  const classes = [
    "rounded-full px-4 py-2 transition-all duration-200",
    "text-title-s",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    getStyles(),
    !disabled && "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      aria-pressed={isSelected}
      className={classes}
    >
      {text}
    </button>
  );
}

"use client";

import React from "react";

interface SegmentOption {
  label: string;
  value: string;
}

interface SegmentButtonProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SegmentButton({
  options,
  value,
  onChange,
  className = "",
}: SegmentButtonProps) {
  return (
    <div className={`inline-flex w-full ${className}`}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`text-label-l relative flex-1 cursor-pointer pb-3 transition-colors duration-200 ${
              isSelected
                ? "text-secondary-500 border-secondary-500 border-b-2"
                : "text-neutral-300 hover:text-neutral-600"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

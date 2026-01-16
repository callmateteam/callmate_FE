import React from "react";

interface SurveyInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function SurveyInput({
  placeholder,
  value,
  onChange,
  disabled = false
}: SurveyInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="text-title-s md:text-title-l rounded-lg bg-neutral-100 px-5 py-3 text-neutral-800 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

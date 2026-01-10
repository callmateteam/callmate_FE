"use client";

import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadInputProps {
  title?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFileSelect?: (files: File[]) => void;
  error?: string;
  className?: string;
}

export default function FileUploadInput({
  title = "title",
  description = "description",
  accept,
  multiple = false,
  maxSize,
  onFileSelect,
  error,
  className = "",
}: FileUploadInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorText, setErrorText] = useState(error || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (files: File[]): string | null => {
    if (maxSize) {
      for (const file of files) {
        if (file.size > maxSize) {
          return `파일 크기는 ${(maxSize / 1024 / 1024).toFixed(0)}MB를 초과할 수 없습니다.`;
        }
      }
    }
    return null;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validationError = validateFiles(files);

    if (validationError) {
      setErrorText(validationError);
      return;
    }

    setErrorText("");
    onFileSelect?.(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validationError = validateFiles(files);

    if (validationError) {
      setErrorText(validationError);
      return;
    }

    setErrorText("");
    onFileSelect?.(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border-2 border-dashed px-12 py-18 transition-all duration-200 ${
          isDragging
            ? "border-secondary-600 bg-neutral-100"
            : "border-neutral-300 bg-white hover:bg-neutral-100"
        } `}
      >
        <div className="bg-primary-50 flex h-15 w-15 items-center justify-center rounded-full">
          <Upload className="text-secondary-500 h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="text-headline-m text-neutral-800">{title}</p>
          <p className="text-body-m mt-1 text-neutral-400">{description}</p>

          {(errorText || error) && (
            <p className="text-label-m text-error-text mt-1">{errorText || error}</p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

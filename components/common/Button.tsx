"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "secondary" | "outlined" | "primary" | "text";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const ButtonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-700 text-white hover:bg-primary-600 text-label-l",
  secondary: "bg-accent-400 text-title-m text-white hover:bg-accent-50 hover:text-accent-400",
  outlined:
    "bg-white border border-neutral-400 text-neutral-400 text-label-l enabled:hover:border-primary-500 enabled:hover:text-primary-500 disabled:bg-neutral-100 disabled:border-neutral-300 disabled:text-neutral-400 disabled:cursor-not-allowed",
  text: "text-neutral-400",
};

const LinkVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-700 text-white hover:bg-primary-600 text-label-l",
  secondary: "bg-accent-400 text-title-m text-white hover:bg-accent-50 hover:text-accent-400",
  outlined:
    "bg-white border border-neutral-400 text-neutral-400 text-label-l hover:border-primary-500 hover:text-primary-500",
  text: "text-neutral-400 hover:text-primary-500",
};

const ButtonBaseStyles =
  "flex items-center justify-center gap-2 rounded-sm transition-colors duration-300 cursor-pointer select-none px-6 py-3";

export default function Button({
  children,
  variant = "primary",
  size,
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  href,
  ...rest
}: ButtonProps) {
  const buttonVariantStyles = href ? LinkVariants[variant] : ButtonVariants[variant];

  const buttonCombinedClassName = [ButtonBaseStyles, buttonVariantStyles].filter(Boolean).join(" ");

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonCombinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonCombinedClassName} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}

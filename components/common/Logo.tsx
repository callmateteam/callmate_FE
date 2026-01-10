import Link from "next/link";

interface LogoProps {
  clickable?: boolean;
  className?: string;
}

export default function Logo({ clickable = false, className = "" }: LogoProps) {
  const logoContent = (
    <span
      className="text-[20px] font-normal tracking-tight md:text-[30px]"
      style={{
        backgroundImage: "linear-gradient(135deg, #0891b2 0%, #0B82A1 50%, #155e75 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Callmate
    </span>
  );

  if (clickable) {
    return (
      <Link href="/" className={className}>
        {logoContent}
      </Link>
    );
  }

  return <div className={className}>{logoContent}</div>;
}

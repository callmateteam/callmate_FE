interface ProgressBarProps {
  percentage: number;
  height?: string;
  className?: string;
}

export default function ProgressBar({
  percentage,
  height = "8px",
  className = "",
}: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full overflow-hidden rounded-full bg-neutral-100" style={{ height }}>
        <div
          className="bg-primary-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${clampedPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}

type BadgeState = "selected" | "unselected";

interface NumberBadgeProps {
  state: BadgeState;
  number: number;
  className?: string;
}

export default function NumberBadge({ state, number, className = "" }: NumberBadgeProps) {
  const stateClasses = {
    selected: "bg-primary-500 text-white",
    unselected: "bg-neutral-200 text-neutral-500",
  };

  return (
    <div
      className={`text-label-m flex size-4 items-center justify-center rounded-full md:size-6 ${stateClasses[state]} ${className}`}
      role="status"
      aria-label={`번호 ${number}${state === "selected" ? " 선택됨" : ""}`}
    >
      {number}
    </div>
  );
}

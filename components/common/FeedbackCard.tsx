interface FeedbackCardProps {
  title: string;
  subtext: string;
  recommend?: boolean;
}

export default function FeedbackCard({ title, subtext, recommend = false }: FeedbackCardProps) {
  return (
    <div className="flex flex-col justify-center gap-3 rounded-xl bg-neutral-100 p-5 transition-colors duration-300 hover:bg-neutral-300">
      <div className="flex items-center gap-2">
        <p className="text-title-l text-neutral-800">{title}</p>
        {recommend && (
          <span className="text-success-text text-label-m rounded-full bg-[#D3FFE3] px-2 py-1">
            추천
          </span>
        )}
      </div>
      <p className="text-body-m text-[#252525]">{subtext}</p>
    </div>
  );
}

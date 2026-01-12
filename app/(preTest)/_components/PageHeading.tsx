interface PageHeadingProps {
  title: string;
  desc: string;
}

export default function PageHeading({ title, desc }: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-headline-l md:text-display-m text-neutral-900">{title}</h3>
      <p className="text-title-m md:text-headline-m whitespace-pre-line text-neutral-400 md:whitespace-normal">
        {desc}
      </p>
    </div>
  );
}

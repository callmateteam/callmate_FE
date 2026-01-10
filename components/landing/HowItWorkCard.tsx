import Image, { StaticImageData } from "next/image";

interface HowItWorkCardProps {
  title: string;
  desc: string;
  image: StaticImageData;
  imageAlt?: string;
}

export default function HowItWorkCard({ title, desc, image, imageAlt }: HowItWorkCardProps) {
  return (
    <article className="flex h-63 w-full max-w-145 flex-col items-center justify-center rounded-[20px] border border-white/20 bg-[#ECFEFF]/30 px-7 py-5 shadow-lg backdrop-blur-md md:h-91.5">
      <Image
        alt={imageAlt || title}
        src={image}
        className="h-30 w-30"
        width={120}
        height={120}
        sizes="120px"
      />
      <div className="flex flex-col gap-3">
        <h3 className="text-headline-l text-primary-500 md:text-display-m">{title}</h3>
        <p className="text-body-m md:text-body-l text-neutral-500">{desc}</p>
      </div>
    </article>
  );
}

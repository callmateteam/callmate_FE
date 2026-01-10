import Image, { StaticImageData } from "next/image";

interface FeatureCardProps {
  title: string;
  subTitle: string;
  desc: string;
  image: StaticImageData;
  imageAlt?: string;
  reverse?: boolean;
}

export default function FeatureCard({
  title,
  subTitle,
  desc,
  image,
  imageAlt = "기능 이미지",
  reverse = false,
}: FeatureCardProps) {
  return (
    <article
      className={`mx-auto flex w-full max-w-300 flex-col gap-5 md:flex-row md:items-center ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div className="flex flex-col gap-4 md:w-1/2">
        <p className="text-title-m text-primary-500 md:text-[20px]">{title}</p>
        <h3 className="text-headline-m md:text-display-m text-neutral-800">{subTitle}</h3>
        <p className="text-label-m md:text-body-l text-neutral-500">
          {desc.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index < desc.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
      <Image
        alt={imageAlt}
        src={image}
        className="md:w-1/2"
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={85}
        priority={title === "복기"}
      />
    </article>
  );
}

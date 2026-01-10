import HowItWorkCard from "./HowItWorkCard";
import how1 from "@/public/landingImgs/how1.png";
import how2 from "@/public/landingImgs/how2.png";

export default function HowltWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="bg-contain bg-center bg-no-repeat px-5 pt-10"
      style={{ backgroundImage: "url('/landingImgs/howbg.png')" }}
    >
      <div className="text-center">
        <h2 id="how-it-works-title" className="md:text-display-l text-[28px] leading-8 font-bold text-neutral-800">
          상담 데이터를 학습해
          <br className="block md:hidden" /> 계속 성장하는 AI
        </h2>
        <p className="text-title-s md:text-headline-m mt-2 text-neutral-400">
          상담이 쌓일수록 CallMate의 답변은 더 정확해지고,
          <br />
          상담 품질은 꾸준히 개선됩니다.
        </p>
      </div>
      <div className="mt-10 mb-2 flex flex-col gap-2 text-center md:mt-16 md:mb-15 md:flex-row md:items-center md:justify-center md:gap-10">
        <HowItWorkCard
          title="실시간 통화 연동"
          desc="실시간 통화 연동으로 바로 대응할 수 있는 멘트를 제공합니다."
          image={how1}
          imageAlt="실시간 통화 연동 기능을 보여주는 이미지"
        />
        <HowItWorkCard
          title="상담 데이터를 통한 지속 학습"
          desc="매일 수백 건의 통화 데이터를 학습하여 더 정확하고 유용한 답변을 제공합니다."
          image={how2}
          imageAlt="AI가 상담 데이터를 학습하는 과정을 보여주는 이미지"
        />
      </div>
    </section>
  );
}

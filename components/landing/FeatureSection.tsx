import FeatureCard from "./FeatureCard";
import component1 from "@/public/landingImgs/component1.png";
import component2 from "@/public/landingImgs/component2.png";
import component3 from "@/public/landingImgs/component3.png";

export default function FeatureSection() {
  return (
    <section aria-labelledby="features-title" className="flex flex-col gap-12 px-5 py-10">
      <h2 id="features-title" className="sr-only">
        주요 기능
      </h2>
      <FeatureCard
        title="복기"
        subTitle="통화 녹취만 업로드하면, 상담 기록은 자동 완성"
        desc={`15초면 충분합니다.\n통화가 끝나자마자 AI기 상담 내용을 텍스트로 정리(STT) 합니다.`}
        image={component1}
        imageAlt="통화 녹취를 텍스트로 자동 변환하는 복기 기능 화면"
      />
      <FeatureCard
        title="대응"
        subTitle="고객 질문에 바로 쓰는 AI 응답 멘트 추천"
        desc={`고객의 질문을 AI가 이해하고\n상황에 맞는 최적의 답변 멘트를 즉시 제안합니다.`}
        image={component2}
        imageAlt="고객 질문에 AI가 답변 멘트를 추천하는 대응 기능 화면"
        reverse
      />
      <FeatureCard
        title="케어"
        subTitle="상담 흐름과 감정까지 분석하는 AI 케어"
        desc={`통화 중 감정 변화를 분석해\n상담사가 놓치기 쉬운 포인트를 짚어주고,\n더 나은 대응 방향을 제안합니다.`}
        image={component3}
        imageAlt="상담 흐름과 감정을 분석하는 AI 케어 기능 화면"
      />
    </section>
  );
}

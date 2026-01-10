import Button from "../common/Button";

export default function CTASection() {
  return (
    <section className="bg-blue-500">
      <div className="flex flex-col items-center justify-center gap-12 px-5 py-10">
        <h2 className="md:text-display-l text-center text-[28px] leading-8 font-bold text-white">
          AI로 상담 품질을 바꾸는
          <br className="block md:hidden" />
          가장 쉬운 방법
          <br />
          지금 CallMate로 시작하세요.
        </h2>
        <Button variant="secondary">체험 시작하기</Button>
      </div>
    </section>
  );
}

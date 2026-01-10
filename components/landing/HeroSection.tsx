import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col items-center justify-center bg-linear-to-br from-[#F5FAFC] to-white py-10 text-center md:py-15"
    >
      <p className="text-title-s text-neutral-400 md:text-[32px]">
        통화 기록을 상담 성과로 바꾸는 AI통화 보조 플랫폼
      </p>
      <h1 id="hero-title" className="text-display-m md:text-display-xl mt-3 mb-12 text-neutral-800">
        기록하는 시간을 넘어,
        <br />
        <span
          style={{
            backgroundImage: "linear-gradient(135deg, #0891b2 0%, #6CBFD5 50%, #4FB8DB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          고객과 소통에 집중하세요
        </span>
      </h1>
      <Button variant="secondary" href="/counselGuide">
        무료체험 시작하기
      </Button>
    </section>
  );
}

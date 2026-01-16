import { Organization, WithContext, WebSite, SoftwareApplication } from "schema-dts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://callmate-fe.vercel.app";

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CallMate",
  description: "AI 통화 보조 플랫폼",
  url: SITE_URL,
  logo: `${SITE_URL}/landingImgs/callmate-img.PNG`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: "Korean",
  },
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CallMate",
  url: SITE_URL,
  description: "AI가 통화를 실시간으로 분석하고 상담 기록을 자동으로 작성합니다.",
  inLanguage: "ko-KR",
};

export const softwareApplicationSchema: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CallMate",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
    description: "무료 체험 가능",
  },
  description: "AI가 통화를 실시간으로 분석하고 상담 기록을 자동으로 작성합니다.",
  featureList: [
    "실시간 통화 녹취 및 STT 변환",
    "AI 기반 응답 멘트 추천",
    "통화 감정 분석 및 케어",
    "상담 데이터 학습 및 품질 개선",
  ],
};

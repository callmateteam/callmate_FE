import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import { organizationSchema, websiteSchema, softwareApplicationSchema } from "./schema";
import { Providers } from "./providers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://callmate-fe.vercel.app";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CallMate - AI 통화 보조 플랫폼 | 상담 기록 자동화",
    template: "%s | CallMate",
  },
  description:
    "AI가 통화를 실시간으로 분석하고 상담 기록을 자동으로 작성합니다. STT 기반 통화 녹취, AI 응답 멘트 추천, 감정 분석으로 상담 품질을 높이세요.",
  keywords: [
    "AI 통화 분석",
    "상담 기록 자동화",
    "STT",
    "통화 녹취",
    "AI 상담",
    "콜센터 솔루션",
    "고객 상담",
    "통화 분석",
    "CallMate",
    "callmate",
    "콜메이트",
  ],
  authors: [{ name: "CallMate Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "CallMate",
    title: "CallMate - AI 통화 보조 플랫폼",
    description: "AI가 통화를 실시간으로 분석하고 상담 기록을 자동으로 작성합니다.",
    images: [
      {
        url: "/landingImgs/callmate-img.PNG",
        width: 1200,
        height: 630,
        alt: "CallMate AI 통화 보조 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CallMate - AI 통화 보조 플랫폼",
    description: "AI가 통화를 실시간으로 분석하고 상담 기록을 자동으로 작성합니다.",
    images: ["/landingImgs/callmate-img.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const pretendard = localFont({
  src: [
    {
      path: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </head>
      <body className={pretendard.variable}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

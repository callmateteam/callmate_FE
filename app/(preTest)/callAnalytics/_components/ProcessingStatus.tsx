"use client";

export default function ProcessingStatus() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* 상단 텍스트 스켈레톤 */}
      <div className="flex flex-col gap-3">
        <div className="shimmer-box h-6 w-48 rounded-md" />
        <div className="shimmer-box h-4 w-32 rounded-md" />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex gap-6">
        {/* 왼쪽 큰 박스 */}
        <div className="shimmer-box h-64 flex-1 rounded-xl" />

        {/* 오른쪽 작은 박스들 */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="shimmer-box h-30 rounded-xl" />
          <div className="shimmer-box h-30 rounded-xl" />
        </div>
      </div>

      {/* CSS 스타일 정의 */}
      <style jsx>{`
        .shimmer-box {
          position: relative;
          overflow: hidden;
          background: #e5e7eb;
        }

        .shimmer-box::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

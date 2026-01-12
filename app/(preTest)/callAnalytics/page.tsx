import PageHeading from "../_components/PageHeading";
import TranscriptionUploader from "./_components/TranscriptionUploader";

export default function CallAnalytics() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeading
        title="통화 분석"
        desc="통화 녹음 파일을 업로드하면 AI가 자동으로 분석하고 최적의 응대 멘트를 추천해드립니다."
      />
      <TranscriptionUploader />
    </div>
  );
}

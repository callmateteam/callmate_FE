import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <span className="relative">
      <input
        type="text"
        placeholder="키워드 검색"
        className="text-label-m h-9 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-5 text-neutral-800 outline-none placeholder:text-neutral-500"
      />
      <Search className="top- absolute top-1/2 right-4 h-5 w-5 -translate-1/2 text-neutral-500" />
    </span>
  );
}

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "키워드 검색",
}: SearchInputProps) {
  return (
    <span className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-label-m h-9 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-5 text-neutral-800 outline-none placeholder:text-neutral-500"
      />
      <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
    </span>
  );
}

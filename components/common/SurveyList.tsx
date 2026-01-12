"use client";

export interface SurveyOption {
  id: string;
  title: string;
  description: string;
}

interface SurveyListProps {
  options: SurveyOption[];
  selectedId?: string;
  onChange: (id: string) => void;
  name: string;
}

export default function SurveyList({ options, selectedId, onChange, name }: SurveyListProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-start gap-3 rounded-lg bg-neutral-100 p-4 transition-all`}
          >
            {/* Radio Button */}
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={isSelected}
              onChange={() => onChange(option.id)}
              className="accent-primary-500 mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
            />

            {/* Content */}
            <div className="flex flex-col gap-1">
              <span className="text-title-l text-neutral-800">{option.title}</span>
              <span className="text-body-m text-neutral-400">{option.description}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
}

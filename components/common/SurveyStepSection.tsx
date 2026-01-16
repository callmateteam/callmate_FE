"use client";

import SurveyList from "@/components/common/SurveyList";

interface SurveyStepSectionProps {
  activeSection: number;
  sectionIndex: number;
  tag?: string;
  label: string;
  description?: string;
  options: { id: string; label: string }[];
  selectedIds: string[];
  onChange: (value: string[]) => void;
  name: string;
}

export default function SurveyStepSection({
  activeSection,
  sectionIndex,
  tag,
  label,
  description,
  options,
  selectedIds,
  onChange,
  name,
}: SurveyStepSectionProps) {
  const show = activeSection === sectionIndex;
  const headerGapClass = tag ? "gap-1" : "gap-2";

  return (
    <div className={`flex flex-col gap-4 ${show ? "" : "hidden"}`}>
      <div className={`flex flex-col ${headerGapClass}`}>
        {tag && <p>{tag}</p>}
        <label className="text-headline-m text-neutral-900">{label}</label>
        {description && <p className="text-body-s text-neutral-500">{description}</p>}
      </div>
      <SurveyList
        options={options.map((option) => ({
          id: option.id,
          title: option.label,
          description: "",
        }))}
        selectedId={selectedIds[0]}
        onChange={(id) => onChange([id])}
        name={name}
      />
    </div>
  );
}

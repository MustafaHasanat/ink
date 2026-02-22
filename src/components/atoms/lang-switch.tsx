"use client";

import { Select } from "@/components";
import { useI18n } from "@/hooks";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, switchLang } = useI18n();

  const options = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ];

  return (
    <Select
      value={lang}
      onValueChange={(value) => {
        switchLang(value);
      }}
      options={options}
      className={className}
    />
  );
}

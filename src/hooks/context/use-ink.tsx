"use client";

import { JSX, useCallback } from "react";
import { useInkContext, useI18n } from "@/hooks";
import { getBottleDrop } from "@/utils";
import { InkBrushElement } from "@/components";
import { BottleDropType } from "@/types";

export function useInk({ key }: { key: string }) {
  const { bottle } = useInkContext();
  const { lang } = useI18n();

  const ink = useCallback(
    (chain: string): JSX.Element => {
      const drop: any = getBottleDrop(bottle?.[key] || {}, chain);

      if (!drop || !lang) return <></>;

      const fieldValue = drop[lang as keyof BottleDropType] as string;
      const id = `${key}.${chain}`;

      return <InkBrushElement id={id}>{fieldValue}</InkBrushElement>;
    },
    [bottle, key, lang],
  );

  const inkText = useCallback(
    (chain: string): string => {
      const drop: any = getBottleDrop(bottle?.[key] || {}, chain);

      if (!drop || !lang) return "";

      return drop[lang as keyof BottleDropType] as string;
    },
    [bottle, key, lang],
  );

  return { ink, inkText, lang, bottle };
}

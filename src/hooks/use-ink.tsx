"use client";

import { JSX, useCallback } from "react";
import { useInkContext } from "@/hooks";
import { getBottleDrop } from "@/helpers";
import { InkBrushElement } from "@/components";

export function useInk({ key }: { key: string }) {
  const { bottle, lang } = useInkContext();

  const ink = useCallback(
    (chain: string): JSX.Element => {
      const drop: any = getBottleDrop(bottle?.[key] || {}, chain);

      if (!drop || !lang) return <></>;

      const fieldValue = drop[lang] as string;
      const id = `${key}.${chain}`;

      return <InkBrushElement id={id}>{fieldValue}</InkBrushElement>;
    },
    [bottle, key, lang],
  );

  const inkText = useCallback(
    (chain: string): string => {
      const drop: any = getBottleDrop(bottle?.[key] || {}, chain);

      if (!drop || !lang) return "";

      return drop[lang] as string;
    },
    [bottle, key, lang],
  );

  return { ink, inkText, lang, bottle };
}

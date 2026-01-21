"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { JSX, useCallback } from "react";
import { useInkContext } from "@/hooks";
import { getBottleDrop } from "@/helpers";
import { InkBrushElement } from "@/components";

export function useInk() {
  const { bottle, lang } = useInkContext();

  const ink = useCallback(
    (chain: string): JSX.Element => {
      const drop: any = getBottleDrop(bottle, chain);

      if (!drop || !lang) return <></>;

      const fieldValue = drop[lang] as string;

      return <InkBrushElement id={chain}>{fieldValue}</InkBrushElement>;
    },
    [bottle, lang],
  );

  return { ink, lang, bottle };
}

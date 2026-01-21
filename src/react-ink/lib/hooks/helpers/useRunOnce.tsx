"use client";

import { useEffect, useRef } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: any;
  dependencies?: string[];
}

/**
 * A hook that runs a given function once to prevent re-runs for the same function
 * when the component first re-renders
 */
export const useRunOnce = ({ fn, dependencies = [] }: Props) => {
  const isRunBefore = useRef(false);

  useEffect(() => {
    if (isRunBefore.current) return;

    isRunBefore.current = true;

    fn();
  }, dependencies);
};

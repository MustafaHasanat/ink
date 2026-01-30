"use client";

import { useCallback, useMemo } from "react";

/**
 * Returns URLSearchParams from the current window location.
 * Use .get("key") to read a single param, or .getAll("key") for repeated params.
 */
export function useQueryParams() {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const setParam = useCallback(
    ({ key, value }: { key: string; value: string }) => {
      searchParams.set(key, value);
      window.history.pushState(
        {},
        "",
        window.location.pathname + "?" + searchParams.toString(),
      );
    },
    [searchParams],
  );

  return { searchParams, getParam, setParam };
}

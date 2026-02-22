"use client";

import { useCallback, useMemo } from "react";

const getLang = (pathname: string) => {
  return pathname.split("/")[1];
};

export function useI18n() {
  const { lang } = useMemo(() => {
    if (typeof window === "undefined") return { lang: "en" };

    const lang = getLang(window.location.pathname);

    return { lang };
  }, []);

  const isRtl: boolean = useMemo(() => lang === "ar", [lang]);

  const dir: "rtl" | "ltr" = useMemo(
    () => (lang === "ar" ? "rtl" : "ltr"),
    [lang],
  );

  const switchLang = useCallback(async (lang: string) => {
    const parts = window.location.pathname.split("/");
    parts[1] = lang;

    // const newPath = parts.join("/");
  }, []);

  return {
    lang,
    isRtl,
    dir,
    switchLang,
  };
}

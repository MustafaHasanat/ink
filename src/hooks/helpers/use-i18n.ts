"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export function useI18n() {
  const params = useParams();
  const lang = (params?.lang as string) || "ar";
  const pathName = usePathname();
  const router = useRouter();

  const isRtl: boolean = useMemo(() => lang === "ar", [lang]);

  const dir: "rtl" | "ltr" = useMemo(
    () => (lang === "ar" ? "rtl" : "ltr"),
    [lang],
  );

  const toggleLang = async () => {
    const parts = pathName.split("/");
    const newLang = lang === "ar" ? "en" : "ar";
    parts[1] = newLang;

    router.push(`${parts.join("/")}`);
  };

  const switchLang = async (lang: string) => {
    const parts = pathName.split("/");
    parts[1] = lang;

    router.push(`${parts.join("/")}`);
  };

  return {
    lang,
    isRtl,
    dir,
    toggleLang,
    switchLang,
  };
}

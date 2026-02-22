"use client";

import { useInk } from "@/hooks";
import { cn } from "@/utils";
import { LangSwitch } from "@/components";

const FALLBACKS = {
  logo: "Ink",
  navHome: "Home",
  navAbout: "About",
  navContact: "Contact",
  heroTitle: "Welcome to Ink",
  heroSubtitle: "Build beautiful, localized experiences with ease.",
  feature1Title: "Localization",
  feature1Desc: "Support multiple languages out of the box.",
  feature2Title: "Flexible",
  feature2Desc: "Adapt to your project structure.",
  feature3Title: "Simple",
  feature3Desc: "Easy to integrate and maintain.",
  footerCopyright: "© 2025 Ink. All rights reserved.",
  footerPrivacy: "Privacy",
  footerTerms: "Terms",
} as const;

export function HomePage() {
  const { inkText } = useInk({ key: "home" });

  const t = (path: string, fallback: string) => inkText(path) || fallback;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-10 border-b border-slate-200",
          "bg-white shadow-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a className="text-xl font-bold tracking-tight text-slate-900">
            {t("header.logo", FALLBACKS.logo)}
          </a>

          <LangSwitch />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <section className="mb-16 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("hero.title", FALLBACKS.heroTitle)}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {t("hero.subtitle", FALLBACKS.heroSubtitle)}
            </p>
          </section>

          {/* Features grid */}
          <section className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                {t("features.localization.title", FALLBACKS.feature1Title)}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {t("features.localization.desc", FALLBACKS.feature1Desc)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                {t("features.flexible.title", FALLBACKS.feature2Title)}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {t("features.flexible.desc", FALLBACKS.feature2Desc)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                {t("features.simple.title", FALLBACKS.feature3Title)}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {t("features.simple.desc", FALLBACKS.feature3Desc)}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-sm text-slate-500">
            {t("footer.copyright", FALLBACKS.footerCopyright)}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700">
              {t("footer.privacy", FALLBACKS.footerPrivacy)}
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-700">
              {t("footer.terms", FALLBACKS.footerTerms)}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

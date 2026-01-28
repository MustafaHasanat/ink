"use client";

import { createContext, useContext } from "react";
import { LocalizationContextState } from "@/types";

export const LocalizationContext = createContext<LocalizationContextState>({
  bottle: {},
  mode: "view",
  lang: null,
  locales: [],
  appConfig: null,
  setAppConfig: () => {},
  setLocales: () => {},
  setLang: () => {},
  setMode: () => {},
  getBottle: async () => {},
});

export const useLocalizationContext = () => {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error(
      "useLocalizationContext must be used within a LocalizationProvider",
    );
  }

  return context;
};

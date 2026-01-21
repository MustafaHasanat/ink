"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { AppContextState } from "../types";

export const AppContext = createContext<AppContextState>({
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

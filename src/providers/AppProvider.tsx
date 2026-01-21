/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { JSX, useCallback, useMemo, useState } from "react";
import {
  BottleType,
  AppContextState,
  InkMode,
  AppProviderProps,
  InkConfig,
} from "@/types";
import { useRunOnce } from "@/hooks";
import { getBottleData } from "@/helpers";
import { AppContext } from "@/context";
import { PathAnnotation } from "@/components";

export const AppProvider = ({
  children,
  config,
}: AppProviderProps): JSX.Element => {
  const [bottle, setBottle] = useState<BottleType>({});
  const [mode, setMode] = useState<InkMode>("view");
  const [lang, setLang] = useState<string | null>(null);
  const [locales, setLocales] = useState<string[]>([]);
  const [appConfig, setAppConfig] = useState<InkConfig | null>(null);

  const initInk = useCallback(async () => {
    setAppConfig(config);

    if (
      !config?.locales ||
      !config?.backendUrl ||
      !config?.currentLocale ||
      !config?.updateConfig ||
      !config?.getConfig ||
      Object.keys(config?.getConfig).length !== 3 || //! update this number whenever you change the props
      Object.keys(config?.updateConfig).length !== 5 //! update this number whenever you change the props
    )
      throw new Error(
        "'Ink' config object is partially undefined, assure you filled all props properly.",
      );

    if (!config.locales.includes(config.currentLocale))
      throw new Error("The locales array does not contain 'currentLocale'");

    config?.locales && setLocales(config?.locales);
    config?.currentLocale && setLang(config?.currentLocale);

    //! build the authorization process in kaiser website for ink
    // await authorize({
    //     email: config?.credentials?.email,
    //     pass: config?.credentials?.pass,
    // });

    const bottle = await getBottleData({ config });

    if (bottle) {
      setBottle(bottle);
    }
  }, [config]);

  useRunOnce({
    fn: initInk,
  });

  const inkProviderValue: AppContextState = useMemo(
    () => ({
      bottle,
      mode,
      lang,
      locales,
      appConfig,
      setAppConfig,
      setLocales,
      setLang,
      getBottle: initInk,
      setMode,
    }),
    [
      bottle,
      mode,
      lang,
      locales,
      appConfig,
      setAppConfig,
      setLocales,
      setLang,
      initInk,
      setMode,
    ],
  );

  return (
    <AppContext.Provider value={inkProviderValue}>
      {children}
      <PathAnnotation />
    </AppContext.Provider>
  );
};

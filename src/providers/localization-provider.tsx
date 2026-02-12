"use client";

import { JSX, useCallback, useMemo, useState } from "react";
import {
  BottleType,
  LocalizationContextState,
  InkMode,
  LocalizationProviderProps,
  InkConfig,
} from "@/types";
import { useGetBottle, useI18n, useRunOnce } from "@/hooks";
import { LocalizationContext } from "@/context";

export const LocalizationProvider = ({
  children,
  config,
}: LocalizationProviderProps): JSX.Element => {
  const { mutateAsync: getBottleData } = useGetBottle({ config });
  const { switchLang } = useI18n();

  const [bottle, setBottle] = useState<BottleType>({});
  const [mode, setMode] = useState<InkMode>("view");

  const [locales, setLocales] = useState<string[]>(config?.locales || []);
  const [appConfig, setAppConfig] = useState<InkConfig | null>(config || null);

  const initInk = useCallback(async () => {
    setAppConfig(config);

    if (
      !config?.locales ||
      !config?.backendUrl ||
      !config?.currentLocale ||
      !config?.getConfig ||
      !config?.createConfig ||
      !config?.updateConfig ||
      !config?.deleteConfig ||
      //! update this number whenever you change the props
      Object.keys(config?.getConfig).length !== 2 ||
      Object.keys(config?.createConfig).length !== 3 ||
      Object.keys(config?.deleteConfig).length !== 2 ||
      Object.keys(config?.updateConfig).length !== 6
    )
      throw new Error(
        "'Ink' config object is partially undefined, assure you filled all props properly.",
      );

    if (!config.locales.includes(config.currentLocale))
      throw new Error("The locales array does not contain 'currentLocale'");

    if (config?.locales) setLocales(config?.locales);

    if (config?.currentLocale) switchLang(config?.currentLocale);

    //! build the authorization process in the website for ink

    const bottle = await getBottleData();

    if (bottle) {
      setBottle(bottle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  useRunOnce({
    fn: initInk,
  });

  const inkProviderValue: LocalizationContextState = useMemo(
    () => ({
      bottle,
      mode,
      locales,
      appConfig,
      setAppConfig,
      setLocales,
      getBottle: initInk,
      setMode,
    }),
    [
      bottle,
      mode,
      locales,
      appConfig,
      setAppConfig,
      setLocales,
      initInk,
      setMode,
    ],
  );

  return (
    <LocalizationContext.Provider value={inkProviderValue}>
      {children}
    </LocalizationContext.Provider>
  );
};

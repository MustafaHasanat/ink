"use client";

import { JSX, useCallback, useMemo, useState } from "react";
import {
  BottleType,
  LocalizationContextState,
  InkMode,
  LocalizationProviderProps,
  InkConfig,
} from "@/types";
import { useGetBottle, useRunOnce } from "@/hooks";
import { LocalizationContext } from "@/context";

export const LocalizationProvider = ({
  children,
  config,
}: LocalizationProviderProps): JSX.Element => {
  const { mutateAsync: getBottleData } = useGetBottle({ config });

  const [bottle, setBottle] = useState<BottleType>({});
  const [mode, setMode] = useState<InkMode>("view");
  const [lang, setLang] = useState<string | null>(
    config?.currentLocale || null,
  );
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

    if (config?.currentLocale) setLang(config?.currentLocale);

    //! build the authorization process in the website for ink
    // await authorize({
    //     email: config?.credentials?.email,
    //     pass: config?.credentials?.pass,
    // });

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
    <LocalizationContext.Provider value={inkProviderValue}>
      {children}
    </LocalizationContext.Provider>
  );
};

"use client";

import { AxiosRequestConfig } from "axios";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type AppProviderProps = {
  children: ReactNode;
  config: InkConfig;
};

export type BottleType = { [key: string]: any };
export type BottleDropType = { en: string; ar: string };
export type InkMode = "view" | "edit";

export type AppContextState = {
  bottle: BottleType;
  mode: InkMode;
  lang: string | null;
  locales: string[];
  appConfig: InkConfig | null;
  setAppConfig: Dispatch<SetStateAction<InkConfig | null>>;
  setLocales: Dispatch<SetStateAction<string[]>>;
  getBottle: () => Promise<void>;
  setMode: Dispatch<SetStateAction<InkMode>>;
  setLang: Dispatch<SetStateAction<string | null>>;
};

export type InkConfig = {
  backendUrl: string;
  locales: string[];
  currentLocale: string;
  getConfig: {
    endpoint: string;
    axiosConfig?: AxiosRequestConfig<any>;
    responsePathToBottle: string[];
  };
  updateConfig: {
    endpoint: string;
    axiosConfig?: AxiosRequestConfig<any>;
    preferredMethod?: "put" | "patch";
    requestFormDataKey: string;
    responsePathToBottle: string[];
  };
  credentials: {
    email: string;
    pass: string;
  };
};

export type SelectOptionType = {
  label: string | number;
  value: string | number;
};

export type NodeActionProps = {
  path: string;
  action:
    | "append-node"
    | "append-leaf"
    | "remove"
    | "change-node"
    | "change-leaf";
  value: string;
};

export type LocaleNode = string | { [key: string]: LocaleNode };

export type InputDataType = {
  currentValue: string;
  fieldPath: string;
  action: NodeActionProps["action"];
} | null;

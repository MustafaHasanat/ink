"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";

export type LocalizationProviderProps = {
  children: ReactNode;
  config: InkConfig;
};

export type BottleType = Record<string, any>;
export type BottleDropType = { en: string; ar: string };
export type InkMode = "view" | "edit";

export type LocalizationContextState = {
  bottle: BottleType;
  mode: InkMode;
  locales: string[];
  appConfig: InkConfig | null;
  setAppConfig: Dispatch<SetStateAction<InkConfig | null>>;
  setLocales: Dispatch<SetStateAction<string[]>>;
  getBottle: () => Promise<void>;
  setMode: Dispatch<SetStateAction<InkMode>>;
};

export type InkConfig = {
  backendUrl: string;
  locales: string[];
  currentLocale: string;
  getConfig: {
    endpoint: string;
    responsePathToBottle: string[];
  };
  createConfig: {
    endpoint: string;
    requestFormDataKey: string;
    bodyShape: "formData" | "json";
  };
  updateConfig: {
    endpoint: string;
    endpointIdentifierKey: string;
    preferredMethod?: "PUT" | "PATCH";
    requestFormDataKey: string;
    responsePathToBottle: string[];
    bodyShape: "formData" | "json";
  };
  deleteConfig: {
    endpoint: string;
    endpointIdentifierKey: string;
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

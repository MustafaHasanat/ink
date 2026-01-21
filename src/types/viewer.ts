"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";

export type ViewerProviderProps = {
  children: ReactNode;
  components: InkProviderComponents;
};

export type InkProviderComponents = {
  [componentName: string]: {
    label: string;
    node: ReactNode;
  };
};

export type ViewerContextState = {
  components: InkProviderComponents;
  currentComponentKey: string | null;
  currentDropKey: string | null;
  setCurrentComponentKey: Dispatch<SetStateAction<string | null>>;
  setCurrentDropKey: Dispatch<SetStateAction<string | null>>;
};

"use client";

import { useContext } from "react";
import { AppContextState, ViewerContextState } from "@/types";
import { AppContext, ViewerContext } from "@/context";

export function useInkContext(): AppContextState & ViewerContextState {
  const appContext = useContext(AppContext);
  const viewerContext = useContext(ViewerContext);

  if (!appContext || !viewerContext) {
    throw new Error("useInkContext must be used within 'InkProvider'");
  }

  return { ...appContext, ...viewerContext };
}

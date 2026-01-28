"use client";

import { createContext, useContext } from "react";
import { ViewerContextState } from "@/types";

export const ViewerContext = createContext<ViewerContextState>({
  components: {},
  currentComponentKey: null,
  currentDropKey: null,
  setCurrentComponentKey: async () => {},
  setCurrentDropKey: async () => {},
});

export const useViewerContext = () => {
  const context = useContext(ViewerContext);

  if (!context) {
    throw new Error("useViewerContext must be used within a ViewerProvider");
  }

  return context;
};

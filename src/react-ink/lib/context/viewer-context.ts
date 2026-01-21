"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { ViewerContextState } from "../types";

export const ViewerContext = createContext<ViewerContextState>({
  components: {},
  currentComponentKey: null,
  currentDropKey: null,
  setCurrentComponentKey: async () => {},
  setCurrentDropKey: async () => {},
});

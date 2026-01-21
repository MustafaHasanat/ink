"use client";

import React, { JSX, useMemo, useState } from "react";
import { ViewerContextState, ViewerProviderProps } from "../types";
import { ViewerContext } from "../context";

export const ViewerProvider = ({
  children,
  components,
}: ViewerProviderProps): JSX.Element => {
  const [currentComponentKey, setCurrentComponentKey] = useState<string | null>(
    null,
  );
  const [currentDropKey, setCurrentDropKey] = useState<string | null>(null);

  const viewerProviderValue: ViewerContextState = useMemo(
    () => ({
      components,
      currentComponentKey,
      currentDropKey,
      setCurrentComponentKey,
      setCurrentDropKey,
    }),
    [
      components,
      currentComponentKey,
      currentDropKey,
      setCurrentComponentKey,
      setCurrentDropKey,
    ],
  );

  return (
    <ViewerContext.Provider value={viewerProviderValue}>
      {children}
    </ViewerContext.Provider>
  );
};

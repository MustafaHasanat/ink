"use client";

import { JSX } from "react";
import { PathAnnotation } from "@/components";
import { AppProvider, ViewerProvider } from "@/providers";
import { ViewerProviderProps, AppProviderProps } from "@/types";
import { Toaster } from "sonner";

export const InkProvider = ({
  children,
  config,
  components,
}: AppProviderProps & ViewerProviderProps): JSX.Element => {
  return (
    <>
      <AppProvider config={config}>
        <ViewerProvider components={components}>
          <Toaster richColors closeButton />
          {children}
        </ViewerProvider>
      </AppProvider>

      <PathAnnotation />
    </>
  );
};

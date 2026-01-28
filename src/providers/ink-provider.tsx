"use client";

import { JSX } from "react";
import { PathAnnotation } from "@/components";
import {
  EditorProvider,
  TanStackProvider,
  LocalizationProvider,
  ViewerProvider,
} from "@/providers";
import { ViewerProviderProps, LocalizationProviderProps } from "@/types";
import { Toaster } from "sonner";

export const InkProvider = ({
  children,
  config,
  components,
}: LocalizationProviderProps & ViewerProviderProps): JSX.Element => {
  return (
    <TanStackProvider>
      <LocalizationProvider config={config}>
        <ViewerProvider components={components}>
          <EditorProvider>
            <Toaster richColors closeButton />
            {children}
            <PathAnnotation />
          </EditorProvider>
        </ViewerProvider>
      </LocalizationProvider>
    </TanStackProvider>
  );
};

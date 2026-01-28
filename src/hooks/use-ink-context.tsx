"use client";

import {
  EditorContextState,
  LocalizationContextState,
  ViewerContextState,
} from "@/types";
import {
  useEditorContext,
  useLocalizationContext,
  useViewerContext,
} from "@/context";

export function useInkContext(): LocalizationContextState &
  ViewerContextState &
  EditorContextState {
  const localizationContext = useLocalizationContext();
  const viewerContext = useViewerContext();
  const editorContext = useEditorContext();

  if (!localizationContext || !viewerContext || !editorContext) {
    throw new Error("useInkContext must be used within 'InkProvider'");
  }

  return { ...localizationContext, ...viewerContext, ...editorContext };
}

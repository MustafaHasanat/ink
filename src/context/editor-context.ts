"use client";

import { createContext, useContext } from "react";
import { EditorContextState } from "@/types";

export const EditorContext = createContext<EditorContextState>({
  inputData: null,
  setInputData: () => {},
  objectData: null,
  oldObjectData: null,
  setObjectData: () => {},
  setOldObjectData: () => {},
  handleNodeAction: () => {},
});

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditorContext must be used within a EditorProvider");
  }

  return context;
};

"use client";

import { JSX, useCallback, useMemo, useState } from "react";
import {
  BottleType,
  EditorContextState,
  EditorProviderProps,
  InputDataType,
  NodeActionProps,
} from "@/types";
import { EditorContext, useLocalizationContext } from "@/context";
import { treeHandler } from "@/helpers";

export const EditorProvider = ({
  children,
}: EditorProviderProps): JSX.Element => {
  const { locales } = useLocalizationContext();

  const [inputData, setInputData] = useState<InputDataType>(null);
  const [objectData, setObjectData] = useState<BottleType | null>(null);
  const [oldObjectData, setOldObjectData] = useState<BottleType | null>(null);

  const handleNodeAction = useCallback(
    ({ action, path, value }: NodeActionProps) => {
      setObjectData(
        treeHandler<typeof objectData>({
          node: objectData,
          splittedPath: path !== "" ? path?.split(".") : [],
          action,
          identifier: null,
          pathFlag: 0,
          value,
          locales,
        }),
      );
    },
    [objectData, locales],
  );

  const editorProviderValue: EditorContextState = useMemo(
    () => ({
      inputData,
      setInputData,
      objectData,
      oldObjectData,
      setObjectData,
      setOldObjectData,
      handleNodeAction,
    }),
    [inputData, objectData, oldObjectData, handleNodeAction],
  );

  return (
    <EditorContext.Provider value={editorProviderValue}>
      {children}
    </EditorContext.Provider>
  );
};

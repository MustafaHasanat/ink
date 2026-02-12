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
import { collectEditorErrors, treeHandler } from "@/utils";

export const EditorProvider = ({
  children,
}: EditorProviderProps): JSX.Element => {
  const { locales } = useLocalizationContext();

  const [inputData, setInputData] = useState<InputDataType>(null);
  const [objectData, setObjectData] = useState<BottleType | null>(null);
  const [oldObjectData, setOldObjectData] = useState<BottleType | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleNodeAction = useCallback(
    ({ action, path, value }: NodeActionProps) => {
      setObjectData((previousObjectData) =>
        treeHandler<typeof previousObjectData>({
          node: previousObjectData,
          splittedPath: path !== "" ? path?.split(".") : [],
          action,
          identifier: null,
          pathFlag: 0,
          value,
          locales,
        }),
      );
    },
    [locales],
  );

  const errors = useMemo(
    () =>
      objectData
        ? collectEditorErrors({
            node: objectData,
            locales,
          })
        : [],
    [objectData, locales],
  );

  const editorProviderValue: EditorContextState = useMemo(
    () => ({
      inputData,
      setInputData,
      objectData,
      setObjectData,
      oldObjectData,
      setOldObjectData,
      errors,
      isUpdating,
      setIsUpdating,
      handleNodeAction,
    }),
    [
      inputData,
      objectData,
      oldObjectData,
      errors,
      isUpdating,
      handleNodeAction,
    ],
  );

  return (
    <EditorContext.Provider value={editorProviderValue}>
      {children}
    </EditorContext.Provider>
  );
};

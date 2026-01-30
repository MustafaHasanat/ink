"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { BottleType, InputDataType, NodeActionProps } from "@/types";

export type EditorProviderProps = {
  children: ReactNode;
};

export type EditorContextState = {
  inputData: InputDataType | null;
  setInputData: Dispatch<SetStateAction<InputDataType | null>>;
  objectData: BottleType | null;
  setObjectData: Dispatch<SetStateAction<BottleType | null>>;
  oldObjectData: BottleType | null;
  setOldObjectData: Dispatch<SetStateAction<BottleType | null>>;
  errors: string[];
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  handleNodeAction: (props: NodeActionProps) => void;
};

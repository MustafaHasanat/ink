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
  oldObjectData: BottleType | null;
  setObjectData: Dispatch<SetStateAction<BottleType | null>>;
  setOldObjectData: Dispatch<SetStateAction<BottleType | null>>;
  handleNodeAction: (props: NodeActionProps) => void;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { TreeNode } from "../../components";
import {
  BottleType,
  InputDataType,
  ItemResponse,
  NodeActionProps,
} from "../../types";
import { treeHandler } from "../../helpers";
import { useInkContext } from "../../hooks";
import axios from "axios";
import { join } from "path";
import { toast } from "sonner";

/**
 * This is the tree-editor component that controls the json file in the backend
 *
 * @returns the tree editor in the InkBrushPage
 */
export const InkTreeEditor = () => {
  const { locales, bottle, appConfig } = useInkContext();
  const [inputData, setInputData] = useState<InputDataType>(null);
  const [objectData, setObjectData] = useState<BottleType | null>(null);

  useEffect(() => {
    bottle && setObjectData(bottle);
  }, [bottle]);

  const onInputConfirm = () => {
    if (inputData?.fieldPath && inputData?.currentValue) {
      handleNodeAction({
        path: inputData?.fieldPath,
        action: inputData?.action,
        value: inputData?.currentValue,
      });

      setInputData(null);
    }
  };

  const handleNodeAction = ({ action, path, value }: NodeActionProps) => {
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
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!appConfig?.updateConfig?.requestFormDataKey || !objectData) return;

    const formData = new FormData();

    formData.append(
      appConfig?.updateConfig?.requestFormDataKey,
      JSON.stringify(objectData),
    );

    const response = await axios.request<ItemResponse<BottleType>>({
      method: appConfig?.updateConfig?.preferredMethod || "patch",
      maxBodyLength: Infinity,
      data: formData,
      url: join(
        appConfig?.backendUrl || "",
        appConfig?.getConfig?.endpoint || "",
      ),
      ...(appConfig?.getConfig?.axiosConfig || {}),
    });

    if (response?.status === 200) {
      toast.success("Data has been updated successfully!");

      const data = appConfig?.updateConfig?.responsePathToBottle?.reduce(
        (acc, curr) => (acc as any)?.[curr] || acc,
        response?.data,
      ) as any;

      setObjectData(
        typeof data === "string"
          ? JSON.parse(`${data}`)
          : typeof data === "object"
            ? data
            : {},
      );
    } else {
      console.error(response);
      toast.error(
        "Unknown error occurred in the server! Check the console for more details.",
      );
    }
  };

  if (objectData === null) return <p>Bottle data is not defined</p>;

  return (
    <form
      onSubmit={onSubmit}
      className="relative grid grid-cols-2 p-8 gap-6 w-full my-2"
    >
      <h1 className="text-2xl font-bold me-auto">
        Inter-localization Tree Editor
      </h1>

      <button
        type="submit"
        className="bg-primary text-white font-bold p-2 rounded-xl px-4 w-fit ms-auto"
      >
        Save Changes
      </button>

      <div className="w-full col-span-2 h-full min-h-[50vh] max-h-[75vh] border px-2 py-5 rounded-xl">
        <div className="w-full col-span-2 h-full overflow-scroll">
          <TreeNode
            node={objectData}
            identifier={null}
            path={[]}
            locales={locales}
            handleNodeAction={handleNodeAction}
            isLocaleContainer={false}
            setInputData={setInputData}
          />
        </div>
      </div>

      {inputData && (
        <div
          className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#91919185] cursor-pointer"
          onClick={() => setInputData(null)}
        />
      )}

      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white flex-col justify-center items-center p-3 gap-6 border rounded-2xl"
        style={{
          display: inputData ? "flex" : "none",
        }}
      >
        <p>Change key/value name</p>

        <input
          type="text"
          className="border p-1 text-sm rounded-md"
          value={inputData?.currentValue}
          onChange={(e) => {
            if (inputData?.fieldPath && inputData?.action)
              setInputData({
                currentValue: e.target.value,
                fieldPath: inputData?.fieldPath,
                action: inputData?.action,
              });
          }}
        />

        <button
          type="button"
          onClick={onInputConfirm}
          className="bg-primary text-white font-bold p-2 rounded-xl px-4 w-fit mx-auto"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

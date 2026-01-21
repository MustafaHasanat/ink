"use client";

import { Grid2x2Plus, Languages, Pencil, Play, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useId, useMemo, useState } from "react";
import React from "react";
import { InputDataType, NodeActionProps, LocaleNode } from "../../types";
import { toast } from "sonner";

interface Props {
  node: LocaleNode;
  identifier: string | null;
  path: string[];
  isLocaleContainer: boolean;
  locales: string[];
  setInputData: Dispatch<SetStateAction<InputDataType>>;
  handleNodeAction: (props: NodeActionProps) => void;
}

/**
 * This component receives a JSON node (bottle-typed) and render its keys and values
 * recursively as a tree of input fields and locale-based leaves
 *
 * @param node the current JSON object that has either sub-nodes or the end-translated string
 * @param identifier the key of the current node (its key in the JSON), null for the root JSON
 * @param path a string arrays of the parent keys (identifiers) for this node, empty array for the root JSON
 * @param isLocaleContainer a boolean indicating wether this node has localization fields or other sub-nodes
 * @param locales the global array of user's used locales (given in the main provider)
 * @param setInputData a setter function to change the currently selected input field to change 
 * @param handleNodeAction a handler function to handle node actions (appending node, deleting node, and changing input value)
 *
 * @usage 
 * ```
    <TreeNode
        node={{ ... }}
        identifier={null}
        path={[]}
        locales={["en", "ar"]}
        handleNodeAction={handleNodeAction}
        isLocaleContainer={false}
        setInputData={setInputData}
    />
 * ```
 * 
 * @returns the current sub-tree
 */
export const TreeNode = ({
  handleNodeAction,
  node,
  identifier = null,
  path,
  locales,
  isLocaleContainer,
  setInputData,
}: Props) => {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const currentValue = useMemo(
    () =>
      identifier
        ? typeof node === "object"
          ? identifier // Key for object nodes
          : typeof node === "string"
            ? node // Value for leaf nodes
            : ""
        : "root",
    [identifier, node],
  );

  const { currentPath, fieldPath } = useMemo(() => {
    const currentPath = [...path, ...(identifier ? [identifier] : [])];
    return {
      currentPath,
      fieldPath: currentPath.join("."),
    };
  }, [path, identifier]);

  return (
    <div key={uniqueId} id={fieldPath} className="flex flex-col gap-3 ml-8">
      <div className={"flex items-center gap-2"}>
        {typeof node === "object" ? (
          <Play
            size={15}
            fill="lightGray"
            onClick={() => setIsOpen((prev) => !prev)}
            className="min-w-[13px] min-h-[13px]"
            style={{
              cursor: "pointer",
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "0.3s ease",
            }}
          />
        ) : (
          <label className="font-bold w-6">
            {identifier?.charAt(0)?.toUpperCase()}
            {identifier?.slice(1)}
          </label>
        )}

        {identifier ? (
          <>
            <input
              type="text"
              className="border p-1 text-sm rounded-md"
              value={currentValue}
              readOnly
            />

            <Pencil
              size={15}
              color="blue"
              className="min-w-[13px] min-h-[13px]"
              style={{
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onClick={() =>
                setInputData({
                  currentValue,
                  fieldPath,
                  action:
                    typeof node === "object" ? "change-node" : "change-leaf",
                })
              }
            />
          </>
        ) : (
          <p className="font-bold">Root</p>
        )}

        {typeof node === "object" && identifier && (
          <>
            <Trash2
              size={15}
              color="crimson"
              className="min-w-[13px] min-h-[13px]"
              style={{
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onClick={() =>
                handleNodeAction({
                  path: fieldPath,
                  action: "remove",
                  value: currentValue,
                })
              }
            />

            {!isLocaleContainer && Object.keys(node).length === 0 && (
              <Languages
                size={15}
                color="indigo"
                className="min-w-[13px] min-h-[13px]"
                style={{
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
                onClick={() =>
                  handleNodeAction({
                    path: fieldPath,
                    action: "append-leaf",
                    value: currentValue,
                  })
                }
              />
            )}
          </>
        )}

        {typeof node === "object" && !isLocaleContainer && (
          <Grid2x2Plus
            size={15}
            color="green"
            className="min-w-[13px] min-h-[13px]"
            style={{
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onClick={() =>
              handleNodeAction({
                path: fieldPath || "",
                action: "append-node",
                value: currentValue,
              })
            }
          />
        )}

        <p
          className="text-[12px] opacity-60 hover:opacity-100 cursor-pointer"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`ink("${fieldPath}")`);
              toast.success("Ink component copied!");
            } catch (err) {
              toast.error("Failed to copy component");
            }
          }}
        >
          {fieldPath}
        </p>
      </div>

      {isOpen &&
        typeof node === "object" &&
        Object.entries(node).map(([subIdentifier, subNode]) => {
          const nodeKeys = Object.keys(subNode);
          const isLocaleContainer: boolean =
            nodeKeys.length === locales.length &&
            nodeKeys.filter((key) => locales.includes(key?.toLowerCase()))
              .length > 0;

          return (
            <TreeNode
              key={subIdentifier}
              identifier={subIdentifier}
              node={subNode}
              handleNodeAction={handleNodeAction}
              locales={locales}
              path={currentPath}
              isLocaleContainer={isLocaleContainer}
              setInputData={setInputData}
            />
          );
        })}
    </div>
  );
};

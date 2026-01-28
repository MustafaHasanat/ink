"use client";

import { useId, useMemo, useState } from "react";
import { LocaleNode } from "@/types";
import {
  NodeToggleButton,
  LangLabel,
  NodeInputField,
  NodeActions,
  NodeFieldPath,
} from "@/components";
import { useInkContext } from "@/hooks";

interface Props {
  node: LocaleNode;
  identifier: string | null;
  path: string[];
  isLocaleContainer: boolean;
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
  node,
  identifier = null,
  path,
  isLocaleContainer,
}: Props) => {
  const uniqueId = useId();
  const { locales } = useInkContext();

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

  const isLeaf = useMemo(() => {
    return typeof node === "string";
  }, [node]);

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
        {isLeaf && <LangLabel identifier={identifier} fieldPath={fieldPath} />}

        {!isLeaf && <NodeToggleButton setIsOpen={setIsOpen} isOpen={isOpen} />}

        {!identifier && <p className="font-bold">Root</p>}

        {identifier && <NodeInputField currentValue={currentValue} />}

        <NodeActions
          currentValue={currentValue}
          fieldPath={fieldPath}
          node={node}
          identifier={identifier}
          isLocaleContainer={isLocaleContainer}
        />

        <NodeFieldPath fieldPath={fieldPath} />
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
              path={currentPath}
              isLocaleContainer={isLocaleContainer}
            />
          );
        })}
    </div>
  );
};

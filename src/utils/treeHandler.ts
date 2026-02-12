import { NodeActionProps } from "@/types";

export function treeHandler<T>({
  action,
  identifier,
  node,
  pathFlag,
  splittedPath,
  value,
  locales,
}: Omit<NodeActionProps, "path"> & {
  node: T;
  identifier: string | null;
  pathFlag: number;
  splittedPath: string[];
  action: NodeActionProps["action"];
  locales: string[];
}) {
  if (identifier && identifier !== splittedPath[pathFlag - 1]) {
    return node;
  }

  if (pathFlag - 1 === splittedPath?.length - 1) {
    if (["remove", "change-node", "change-leaf"].includes(action)) {
      return null;
    }
    if (action === "append-node") {
      let newFieldNum: number = 1;

      Object.keys(node as any).map((fieldName) => {
        if ("new-field-" + newFieldNum === fieldName) {
          newFieldNum += 1;
        }
      });

      return {
        ...node,
        ["new-field-" + newFieldNum]: {},
      };
    }
    if (action === "append-leaf") {
      const localesNodes: any = {};

      locales?.map((locale) => {
        localesNodes[locale] = "placeholder";
      });

      return {
        ...node,
        ...localesNodes,
      };
    }
  }

  let resultantNode: any = {};

  if (typeof node === "object") {
    Object.entries(node as any)?.map(([subIdentifier, subNode]) => {
      const recursiveNode = treeHandler({
        identifier: subIdentifier,
        node: subNode as T,
        pathFlag: pathFlag + 1,
        splittedPath,
        action,
        value,
        locales,
      });

      if (recursiveNode) {
        resultantNode = { ...resultantNode, [subIdentifier]: recursiveNode };
      }

      if (!recursiveNode && pathFlag === splittedPath?.length - 1) {
        if (action === "change-node") {
          resultantNode = { ...resultantNode, [value]: subNode };
        }
        if (action === "change-leaf") {
          resultantNode = { ...resultantNode, [subIdentifier]: value };
        }
      }
    });
  }

  return resultantNode;
}

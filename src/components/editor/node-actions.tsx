import { ReactNode } from "react";
import { useInkContext } from "@/hooks";
import { LocaleNode } from "@/types";
import { Copy, Grid2x2Plus, Languages, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { toast } from "sonner";

type ActionIconButtonProps = {
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

function ActionIconButton({
  onClick,
  children,
  className,
}: ActionIconButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md shadow-xs transition-colors",
        "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export function NodeActions({
  currentValue,
  fieldPath,
  node,
  identifier,
  isLocaleContainer,
}: {
  currentValue: string;
  fieldPath: string;
  node: LocaleNode;
  identifier: string | null;
  isLocaleContainer: boolean;
}) {
  const { setInputData, handleNodeAction } = useInkContext();

  const isObject = typeof node === "object";

  return (
    <section className="flex items-center gap-1.5">
      {identifier && (
        <ActionIconButton
          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
          onClick={() =>
            setInputData({
              currentValue,
              fieldPath,
              action: isObject ? "change-node" : "change-leaf",
            })
          }
        >
          <Pencil size={13} />
        </ActionIconButton>
      )}

      {isObject && identifier && (
        <ActionIconButton
          className="bg-rose-50 text-rose-600 hover:bg-rose-100"
          onClick={() =>
            handleNodeAction({
              path: fieldPath,
              action: "remove",
              value: currentValue,
            })
          }
        >
          <Trash2 size={13} />
        </ActionIconButton>
      )}

      {isObject &&
        identifier &&
        !isLocaleContainer &&
        Object.keys(node).length === 0 && (
          <ActionIconButton
            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            onClick={() =>
              handleNodeAction({
                path: fieldPath,
                action: "append-leaf",
                value: currentValue,
              })
            }
          >
            <Languages size={13} />
          </ActionIconButton>
        )}

      {isObject && !isLocaleContainer && (
        <ActionIconButton
          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
          onClick={() =>
            handleNodeAction({
              path: fieldPath || "",
              action: "append-node",
              value: currentValue,
            })
          }
        >
          <Grid2x2Plus size={13} />
        </ActionIconButton>
      )}

      {isObject && isLocaleContainer && (
        <ActionIconButton
          className="bg-gray-50 text-gray-600 hover:bg-gray-100"
          onClick={async () => {
            try {
              const path = fieldPath.split(".").slice(1).join(".");
              await navigator.clipboard.writeText(`ink("${path}")`);
              toast.success("Ink component copied!");
            } catch (err) {
              toast.error("Failed to copy component");
            }
          }}
        >
          <Copy size={13} />
        </ActionIconButton>
      )}
    </section>
  );
}

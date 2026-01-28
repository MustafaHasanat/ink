"use client";

import { FormEvent, useEffect } from "react";
import { EditorModal, TreeNode } from "@/components";
import { useInkContext, useUpdateBottle } from "@/hooks";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { toast } from "sonner";

/**
 * This is the tree-editor component that controls the json file in the backend
 *
 * @returns the tree editor in the InkBrushPage
 */
export const InkTreeEditor = () => {
  const { objectData, setObjectData, bottle } = useInkContext();
  const { mutateAsync: updateBottle } = useUpdateBottle();

  useEffect(() => {
    if (bottle) setObjectData(bottle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottle]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await updateBottle();

    if (response) {
      toast.success("Bottle updated successfully");
    } else {
      toast.error("Failed to update bottle");
    }
  };

  if (objectData === null)
    return (
      <div className="mt-4 rounded-xl border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground/70 shadow-sm">
        Bottle data is not defined
      </div>
    );

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col relative w-full h-fit gap-3",
        "my-3 rounded-2xl border border-foreground/10 bg-background/80 p-6 shadow-sm",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          Ink tree editor
        </h2>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "inline-flex items-center justify-center rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground",
            "shadow-sm transition-all hover:bg-primary/90 hover:shadow-md cursor-pointer",
          )}
        >
          Save changes
        </motion.button>
      </div>

      <div className="h-full min-h-[20vh] max-h-[60vh] overflow-hidden rounded-xl border border-dashed border-foreground/15 bg-background/70">
        <div className="h-full w-full overflow-auto px-3 py-4">
          <TreeNode
            node={objectData}
            identifier={null}
            path={[]}
            isLocaleContainer={false}
          />
        </div>
      </div>

      <EditorModal />
    </form>
  );
};

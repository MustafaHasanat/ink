"use client";

import { JSX } from "react";
import { useEditorContext } from "@/context";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils";

/**
 * EditorModal
 *
 * This component renders a visually appealing modal
 * with a subtle motion transition for the editor.
 *
 * @returns the editor modal
 */
export function EditorModal(): JSX.Element {
  const { inputData, setInputData, handleNodeAction } = useEditorContext();

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

  const onClose = () => setInputData(null);

  const isOpen = !!inputData;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Edit value"
            className="relative flex w-full bg-white max-w-sm flex-col gap-4 rounded-2xl border border-foreground/10 bg-background px-6 py-5 shadow-lg"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                Change key / value name
              </p>
            </header>

            <input
              type="text"
              className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={inputData?.currentValue ?? ""}
              onChange={(event) => {
                if (inputData?.fieldPath && inputData?.action) {
                  setInputData({
                    currentValue: event.target.value,
                    fieldPath: inputData?.fieldPath,
                    action: inputData?.action,
                  });
                }
              }}
              autoFocus
            />

            <footer className="mt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "cursor-pointer rounded-xl px-3 py-1.5 text-xs font-medium text-foreground/70",
                  " transition-all hover:bg-primary/90 hover:shadow-md",
                )}
              >
                Cancel
              </button>

              <motion.button
                type="button"
                onClick={onInputConfirm}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "cursor-pointer rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm",
                  " transition-all hover:bg-primary/90 hover:shadow-md",
                )}
              >
                Confirm
              </motion.button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

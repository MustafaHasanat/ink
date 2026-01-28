"use client";

import { useInkContext } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PathAnnotation
 *
 * The floated path box that displays the currently hovered InkBrushElement
 * with a subtle motion and a more polished visual style.
 *
 * @returns the floated path annotation box
 */
export function PathAnnotation() {
  const { currentDropKey } = useInkContext();

  return (
    <AnimatePresence>
      {currentDropKey && (
        <motion.span
          key={currentDropKey}
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed left-5 top-24 z-30 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-medium text-white/80 shadow-md backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="uppercase tracking-wide text-white/60">Path</span>
          <span className="max-w-xs truncate text-white/90">
            {currentDropKey}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

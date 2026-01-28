"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { Boxes, MousePointerSquareDashed } from "lucide-react";
import { Text } from "@/components";

/**
 * ViewEmptyComponent
 *
 * This component renders a visually appealing empty state
 * for when no component has been selected in the viewer.
 *
 * @returns the component selection empty state
 */
export const ViewEmptyComponent = (): JSX.Element => {
  return (
    <section className="flex h-full min-h-[320px] w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-foreground/10 bg-background/60 px-8 py-10 text-center shadow-sm backdrop-blur-sm"
      >
        <span className="mb-1 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Boxes className="h-7 w-7" />
        </span>

        <Text className="text-lg font-semibold tracking-tight">
          No component selected
        </Text>

        <Text className="text-foreground/60">
          Choose a component from the header dropdown to start previewing your
          Ink brush content in the canvas.
        </Text>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs text-primary"
        >
          <MousePointerSquareDashed className="h-4 w-4" />
          <span>Select a component to get started</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { Languages, Sparkles } from "lucide-react";
import { Text } from "@/components";

/**
 * ViewEmptyLang
 *
 * This component renders a visually appealing empty state
 * for when no language has been selected in the viewer.
 *
 * @returns the language selection empty state
 */
export const ViewEmptyLang = (): JSX.Element => {
  return (
    <section className="flex h-full min-h-[260px] w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-foreground/10 bg-background/60 px-7 py-8 text-center shadow-sm backdrop-blur-sm"
      >
        <span className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <Languages className="h-6 w-6" />
        </span>

        <Text className="text-base font-semibold tracking-tight">
          No language selected
        </Text>

        <Text className="text-foreground/60">
          Pick a language from the header to see how your content looks in each
          locale.
        </Text>

        <motion.div
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-secondary/5 px-3 py-1 text-xs text-secondary"
        >
          <Sparkles className="h-4 w-4" />
          <span>Languages help you preview localization</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

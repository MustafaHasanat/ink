import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInkContext } from "@/hooks";

export const ErrorsBox = () => {
  const { errors } = useInkContext();

  const hasErrors = useMemo(() => errors?.length > 0, [errors]);

  return (
    <AnimatePresence>
      {hasErrors && (
        <motion.div
          key="errors-box"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs shadow-sm"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                !
              </span>

              <p className="text-xs font-semibold text-red-700">
                Validation issues detected
              </p>
            </div>

            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-red-600">
              {errors.length} issue{errors.length > 1 ? "s" : ""}
            </span>
          </div>

          <ul className="flex flex-col gap-1.5 pr-1">
            {errors.map((error) => (
              <motion.li
                key={error}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-start gap-2 rounded-lg bg-red-100/60 px-2 py-1.5 text-[11px] leading-snug text-red-700"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <p>{error}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

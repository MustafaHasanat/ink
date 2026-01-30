"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { SelectOptionType } from "@/types";
import { Control, Controller, Path } from "react-hook-form";
import { cn } from "@/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props<T extends object> = {
  options: SelectOptionType[];
  name: Path<T>;
  control: Control<T>;
  className?: string;
  disabled?: boolean;
  postOnChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function Select<T extends object>({
  className = "",
  options,
  control,
  name,
  postOnChange,
  disabled,
  ...rest
}: Props<T>) {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options?.find(
          (opt) => String(opt.value) === String(field.value),
        );
        const displayLabel = selected?.label ?? options?.[0]?.label ?? "";

        const handleSelect = (opt: SelectOptionType) => {
          field.onChange(opt.value);
          postOnChange?.({
            target: { value: opt.value },
          } as ChangeEvent<HTMLSelectElement>);
          setIsOpen(false);
        };

        return (
          <div
            ref={containerRef}
            className={cn("group relative inline-flex w-48", className)}
          >
            <motion.button
              type="button"
              disabled={disabled}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-label="Select option"
              onClick={() => setIsOpen((prev) => !prev)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 pr-9 text-left text-sm font-normal whitespace-nowrap",
                "border-gray-300 bg-white text-gray-900 shadow-sm",
                "cursor-pointer transition-all duration-150 ease-out hover:border-gray-400 hover:shadow-md outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
              )}
              {...rest}
            >
              <span className="truncate">{displayLabel}</span>
              <ChevronDownIcon
                className={cn(
                  "pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-gray-500 transition-transform duration-200",
                  isOpen && "rotate-180 text-primary",
                )}
              />
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Options"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-0 z-50 max-h-60 w-full overflow-y-auto overflow-x-hidden",
                    "mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5",
                  )}
                >
                  {options?.map((opt, index) => {
                    const isSelected =
                      String(opt.value) === String(field.value);

                    return (
                      <motion.button
                        key={`${uniqueId}-${index}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(opt)}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-normal text-gray-900 transition-colors duration-150",
                          "hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer",
                          isSelected && "bg-primary/10 text-primary",
                        )}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && (
                          <CheckIcon className="size-4 shrink-0 text-primary" />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    />
  );
}

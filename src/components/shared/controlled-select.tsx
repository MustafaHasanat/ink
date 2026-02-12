"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { SelectOptionType } from "@/types";
import { Control, Controller, Path } from "react-hook-form";
import { Select } from "./select";

type Props<T extends object> = {
  options: SelectOptionType[];
  name: Path<T>;
  control: Control<T>;
  className?: string;
  disabled?: boolean;
  postOnChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function ControlledSelect<T extends object>({
  className = "",
  options,
  control,
  name,
  postOnChange,
  disabled,
  ...rest
}: Props<T>) {
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
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
          }}
          options={options}
          postOnChange={postOnChange}
          disabled={disabled}
          className={className}
          {...rest}
        />
      )}
    />
  );
}

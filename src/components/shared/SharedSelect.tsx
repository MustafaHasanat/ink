"use client";

import { useId } from "react";
import { SelectOptionType } from "@/types";
import { Control, Controller, Path } from "react-hook-form";

type Props<T extends object> = {
  options: SelectOptionType[];
  name: Path<T>;
  control: Control<T>;
  className?: string;
  postOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SharedSelect<T extends object>({
  className = "",
  options,
  control,
  name,
  postOnChange,
  ...rest
}: Props<T>) {
  const uniqueId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className={`border p-2 rounded-md text-black bg-white ${className}`}
          onChange={(event) => {
            field?.onChange(event);
            if (postOnChange) postOnChange(event);
          }}
          {...rest}
        >
          {options?.map(({ value, label }, index) => (
            <option key={uniqueId + index} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
    />
  );
}

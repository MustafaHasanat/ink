"use client";

import React, { useId } from "react";
import { SelectOptionType } from "../../types";
import { Control, Controller } from "react-hook-form";

interface Props {
  options: SelectOptionType[];
  name: string;
  control: Control<any>;
  className?: string;
  postOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SharedSelect: React.FC<
  React.HTMLAttributes<HTMLSelectElement> & Props
> = ({
  className = "",
  options,
  control,
  name,
  postOnChange,
  ...rest
}: Props) => {
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
            postOnChange && postOnChange(event);
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
};

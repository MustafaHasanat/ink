/* eslint-disable no-unsafe-optional-chaining */
"use client";

import { JSX } from "react";
import { Select } from "@/components";
import { InkMode } from "@/types";
import { useInkContext } from "@/hooks";
import { useForm } from "react-hook-form";
import { inkBrushHeaderSchema, InkBrushHeaderSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils";

/**
 * This is the header of the admin ink page
 *
 * @returns the header of the app
 */
export const Header = (): JSX.Element => {
  const {
    components,
    locales,
    setCurrentComponentKey,
    mode,
    setMode,
    setLang,
  } = useInkContext();

  const { control } = useForm<InkBrushHeaderSchemaType>({
    mode: "all",
    resolver: zodResolver(inkBrushHeaderSchema),
  });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-20 h-18 border-b border-gray-200",
        "bg-primary bg-white w-screen flex items-center justify-end gap-3 px-5",
      )}
    >
      {mode === "view" && (
        <>
          <Select<InkBrushHeaderSchemaType>
            name="component"
            control={control}
            postOnChange={(event) => {
              setCurrentComponentKey(event.target.value);
            }}
            options={[
              {
                label: "Select a component",
                value: "",
              },
              ...Object.entries(components)?.map(([key, { label }]) => ({
                label,
                value: key,
              })),
            ]}
          />

          <Select
            name="lang"
            control={control}
            postOnChange={(event) => {
              setLang(event.target.value as InkMode);
            }}
            options={[
              {
                label: "Select language",
                value: "",
              },
              ...locales?.map((locale) => ({
                label:
                  locale?.length > 1
                    ? `${locale?.charAt(0)?.toUpperCase()}${locale?.slice(1)}`
                    : locale,
                value: locale,
              })),
            ]}
          />
        </>
      )}

      <Select<InkBrushHeaderSchemaType>
        name="mode"
        control={control}
        postOnChange={(event) => {
          setMode(event.target.value as InkMode);
        }}
        options={[
          {
            label: "View",
            value: "view",
          },
          {
            label: "Edit",
            value: "edit",
          },
        ]}
      />
    </header>
  );
};

/* eslint-disable no-unsafe-optional-chaining */
"use client";

import React, { JSX } from "react";
import { SharedSelect, SharedText } from "..";
import { InkMode } from "../../types";
import { useInkContext } from "../../hooks";
import { useForm } from "react-hook-form";
import { inkBrushHeaderSchema, InkBrushHeaderSchemaType } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <header className="bg-primary w-full flex items-center justify-between gap-3 px-5 h-[70px] text-white">
      <SharedText className="font-bold">Components</SharedText>

      <div className="flex items-center gap-3">
        {mode === "view" && (
          <>
            <SharedSelect
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

            <SharedSelect
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

        <SharedSelect
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
      </div>
    </header>
  );
};

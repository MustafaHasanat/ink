"use client";

import { JSX, useMemo } from "react";
import { useRunOnce, useInkContext, useI18n } from "@/hooks";
import {
  InkTreeEditor,
  ViewEmptyComponent,
  ViewEmptyLang,
  Header,
} from "@/components";

/**
 * This is the admin side of the ink-page, it displays both the ink-viewer and ink-editor
 *
 * @usage
 * ```
    import React from "react";
    import { InkBrush } from "@js-empire/ink";

    export default async function Page() {
         return <InkBrush />;
    }
 * ```
 * 
 * @returns the ink admin page
 */
export const InkBrushPage = (): JSX.Element => {
  const { components, currentComponentKey, setMode, mode } = useInkContext();
  const { lang } = useI18n();

  const isEdit = mode === "edit";
  const isView = mode === "view";
  const hasComponent = !!currentComponentKey;
  const isLangSelected = !!lang;

  const selectedComponent = useMemo(() => {
    if (!currentComponentKey) return null;

    return components[currentComponentKey]?.node;
  }, [components, currentComponentKey]);

  useRunOnce({
    fn: () => {
      setMode("view");
    },
  });

  const EmptyView = () => {
    if (!isView) return null;

    if (!hasComponent) return <ViewEmptyComponent />;
    if (!isLangSelected) return <ViewEmptyLang />;

    return null;
  };

  return (
    <div className="w-screen h-screen flex flex-col pt-18">
      <Header />

      <main className="flex h-full w-full flex-col justify-start bg-background px-5 py-5">
        {isEdit && <InkTreeEditor />}

        {isView && hasComponent && isLangSelected && selectedComponent}

        <EmptyView />
      </main>
    </div>
  );
};

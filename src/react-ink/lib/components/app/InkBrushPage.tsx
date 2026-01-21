"use client";

import React, { JSX, useMemo } from "react";
import { useRunOnce, useInkContext } from "../../hooks";
import { InkTreeEditor, Header, SharedText } from "..";

/**
 * This is the admin side of the ink-page, it displays both the ink-viewer and ink-editor
 *
 * @usage
 * ```
    import React from "react";
    import { InkBrush } from "@kaiserleap/ink/react-ink";

    export default async function Page() {
         return <InkBrush />;
    }
 * ```
 * 
 * @returns the ink admin page
 */
export const InkBrushPage = (): JSX.Element => {
  const { components, currentComponentKey, setMode, lang, mode } =
    useInkContext();

  useRunOnce({
    fn: () => {
      setMode("view");
    },
  });

  const body = useMemo(() => {
    if (mode === "edit") return <InkTreeEditor />;

    if (mode === "view") {
      if (!currentComponentKey)
        return <SharedText>No component has been selected</SharedText>;

      if (!lang) return <SharedText>No language has been selected</SharedText>;

      return components[currentComponentKey]?.node;
    }

    return <></>;
  }, [mode, lang, currentComponentKey]);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Header />

      <main className="w-full h-full overflow-y-scroll flex justify-center items-center bg-background px-5 py-5">
        {body}
      </main>
    </div>
  );
};

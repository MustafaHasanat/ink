"use client";

import { JSX } from "react";
import { useInkContext } from "@/hooks";

/**
 * The floated path box that displays the currently hovered InkBrushElement
 *
 * @returns the floated path annotation box
 */
export const PathAnnotation = (): JSX.Element => {
  const { currentDropKey } = useInkContext();

  if (!currentDropKey) return <></>;

  return (
    <span
      style={{
        position: "fixed",
        top: "90px",
        fontSize: "12px",
        background: "#000000b1",
        color: "#ffffffc9",
        borderRadius: "8px",
        overflow: "hidden",
        left: "20px",
        transition: "0.3s ease",
        padding: "2px 10px",
      }}
    >
      {`path: ${currentDropKey}`}
    </span>
  );
};

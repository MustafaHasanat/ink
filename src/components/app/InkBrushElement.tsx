"use client";

import { CSSProperties, JSX, ReactNode, useMemo, useState } from "react";
import { useInkContext } from "@/hooks";

interface Props {
  children: ReactNode;
  id: string;
}

/**
 * This is the final element that displays the corresponding translated text
 *
 * @param id the id of the component
 * @param children the dynamic text of the element
 *
 * @returns the final ink-component
 */
export const InkBrushElement = ({ id, children }: Props): JSX.Element => {
  const [isHover, setIsHover] = useState(false);
  const { setCurrentDropKey } = useInkContext();

  const viewStyles = useMemo(
    () =>
      isHover
        ? ({
            background: "#bc82ff78",
            border: "1px dashed black",
            borderRadius: "5px",
          } as CSSProperties)
        : ({
            background: "transparent",
            border: "1px dashed transparent",
            borderRadius: "0px",
          } as CSSProperties),
    [isHover],
  );

  const handleMouseEvent = (event: "enter" | "leave") => {
    setIsHover(event === "enter");
    setCurrentDropKey(event === "enter" ? id : null);
  };

  return (
    <span
      id={id}
      onMouseEnter={() => handleMouseEvent("enter")}
      onMouseLeave={() => handleMouseEvent("leave")}
      className="relative hover:bg-secondary-100 hover:border-dashed hover:rounded-md"
      style={{
        transition: "0.3s ease",
        ...viewStyles,
      }}
    >
      {children}
    </span>
  );
};

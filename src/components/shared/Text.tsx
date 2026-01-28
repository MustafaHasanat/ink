"use client";

import React, { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  styles?: CSSProperties;
}

export const Text: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & Props
> = ({
  children,
  className = "",
  styles = {},
  variant = "p",
  ...rest
}: Props) => {
  return (
    <p
      className={`${className}`}
      style={{
        ...styles,
      }}
      {...rest}
    >
      {children}
    </p>
  );
};

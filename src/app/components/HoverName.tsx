"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

export default function HoverName({
  name,
  hoverText,
  style,
}: {
  name: string;
  hoverText: string;
  style?: CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      style={{ position: "relative", display: "inline-block", textAlign: "left", cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 너비 확보용 invisible spacer */}
      <span style={{ ...style, visibility: "hidden", whiteSpace: "nowrap", display: "block" }}>
        {hoverText.length >= name.length ? hoverText : name}
      </span>
      {/* 이름 */}
      <span style={{ ...style, position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: hovered ? 0 : 1, transition: "opacity 0.35s ease" }}>
        {name}
      </span>
      {/* 역할 */}
      <span style={{ ...style, position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease" }}>
        {hoverText}
      </span>
    </span>
  );
}

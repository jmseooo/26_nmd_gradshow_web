"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 400, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
  }, [pathname]);

  return (
    <div id="page-wrapper" ref={ref}>
      {children}
    </div>
  );
}

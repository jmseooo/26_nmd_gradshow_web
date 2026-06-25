"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    window.scrollTo(0, 0);
    // 페인트 전에 opacity 0 확보 → 플래시 없이 fade-in
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    const anim = el.animate(
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
    anim.onfinish = () => {
      anim.cancel();
      el.style.opacity = "";
      el.style.transform = "";
    };
    return () => anim.cancel();
  }, [pathname]);

  return (
    <div id="page-wrapper" ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

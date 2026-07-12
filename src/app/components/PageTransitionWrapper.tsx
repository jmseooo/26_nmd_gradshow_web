"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="page-wrapper" key={pathname} style={{ animation: "pageFadeIn 200ms ease-out both" }}>
      {children}
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

const TAB_ORDER: Record<string, number> = {
  "/": 0,
  "/works": 1,
  "/designer": 2,
  "/guestbook": 3,
  "/field": 4,
};

function getTabIdx(pathname: string): number {
  if (pathname.startsWith("/student/")) return 2;
  return TAB_ORDER[pathname] ?? -1;
}

// Module-level prev: persists between StrictMode effect re-runs within same session
const _nav = { prev: "" };

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    window.scrollTo(0, 0);

    const prev = _nav.prev;
    _nav.prev = pathname;

    const pi = getTabIdx(prev);
    const ci = getTabIdx(pathname);
    const dx = prev && prev !== pathname && pi !== -1 && ci !== -1
      ? (ci > pi ? 50 : ci < pi ? -50 : 0)
      : 0;

    // opacity는 SSR HTML에 포함되지 않도록 useLayoutEffect(클라이언트 전용)에서만 설정
    el.style.opacity = "0";
    el.style.transform = dx ? `translateX(${dx}px)` : "translateY(12px)";

    const anim = el.animate(
      [
        { opacity: 0, transform: dx ? `translateX(${dx}px)` : "translateY(12px)" },
        { opacity: 1, transform: dx ? "translateX(0)" : "translateY(0)" },
      ],
      { duration: 560, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
    anim.onfinish = () => {
      anim.cancel();
      el.style.opacity = "";
      el.style.transform = "";
    };
    return () => anim.cancel();
  }, [pathname]);

  return (
    <div id="page-wrapper" ref={ref}>
      {children}
    </div>
  );
}

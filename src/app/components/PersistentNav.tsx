"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useHeroLight } from "./HeroLightContext";

const PATH_TO_ITEM: Record<string, string> = {
  "/": "거점",
  "/works": "작품",
  "/designer": "디자이너",
  "/guestbook": "방명록",
  "/field": "현장",
};

export default function PersistentNav() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const { isLight } = useHeroLight();

  const isHome = pathname === "/";
  const activeItem = pathname.startsWith("/student/")
    ? "디자이너"
    : (PATH_TO_ITEM[pathname] ?? "거점");

  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    if (!isHome) { setNavHidden(false); return; }
    const onScroll = () => setNavHidden(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const home = pathname === "/";

    const update = () => {
      // 홈: 히어로가 뷰포트를 가득 채우도록 body padding 없음 (투명 NavBar가 히어로 위에 오버레이)
      // 다른 페이지: 흰 NavBar 높이만큼 body 상단 여백 확보
      document.body.style.paddingTop = home ? "0px" : `${el.offsetHeight}px`;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingTop = "";
    };
  }, [pathname]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isHome ? "transparent" : "white",
        paddingTop: isHome ? "clamp(0px, 2.95vw, 42.5px)" : "clamp(10px, 4.93vw, 71px)",
        paddingLeft: "clamp(16px, 5.56vw, 80px)",
        paddingRight: "clamp(16px, 5.56vw, 80px)",
        paddingBottom: 0,
        transform: navHidden ? "translateY(-110%)" : "translateY(0)",
        transition: "transform 0.35s ease",
      }}
    >
      <NavBar
        activeItem={activeItem}
        isLight={isHome ? isLight : true}
        compact={!isHome}
      />
    </div>
  );
}

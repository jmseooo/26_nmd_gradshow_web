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
  const isDesigner = pathname === "/designer";
  const isWorks = pathname === "/works";
  const isGuestbook = pathname === "/guestbook";
  const isTransparentNav = isHome || isDesigner;
  const activeItem = pathname.startsWith("/student/")
    ? "디자이너"
    : (PATH_TO_ITEM[pathname] ?? "거점");

  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    if (!isHome && !isDesigner && !isWorks && !isGuestbook) { setNavHidden(false); return; }
    const onScroll = () => setNavHidden(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, isDesigner, isWorks, isGuestbook]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const home = pathname === "/";

    const update = () => {
      if (window.innerWidth < 480) return;
      const actualH = `${el.offsetHeight}px`;
      document.body.style.paddingTop = home ? "0px" : actualH;
      document.body.style.setProperty("--nav-height", actualH);
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
        backgroundColor: isTransparentNav ? "transparent" : "white",
        transition: "transform 0.35s ease",
        paddingTop: "clamp(0px, 2.5vw, 36px)",
        paddingLeft: "clamp(16px, 5.56vw, 80px)",
        paddingRight: "clamp(16px, 5.56vw, 80px)",
        paddingBottom: 0,
        transform: navHidden ? "translateY(-110%)" : "translateY(0)",
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

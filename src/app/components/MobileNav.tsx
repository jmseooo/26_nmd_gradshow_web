"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import TransitionLink from "./TransitionLink";

const PATH_TO_ITEM: Record<string, string> = {
  "/": "거점",
  "/works": "작품",
  "/designer": "디자이너",
  "/guestbook": "방명록",
  "/field": "현장",
};

const NAV_HREFS: Record<string, string> = {
  거점: "/", 작품: "/works", 디자이너: "/designer", 방명록: "/guestbook",
};

const allItems = ["거점", "작품", "디자이너", "방명록"];

export default function MobileNav() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const isTransparentNav = pathname === "/designer" || pathname.startsWith("/student/");
  const activeItem = pathname.startsWith("/student/")
    ? "디자이너"
    : (PATH_TO_ITEM[pathname] ?? "거점");

  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    const hideOnScroll = isHome || ["/works", "/designer", "/guestbook"].includes(pathname);
    if (!hideOnScroll) { setNavHidden(false); return; }
    const onScroll = () => setNavHidden(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, isHome]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      if (window.innerWidth >= 480) return;
      document.body.style.paddingTop = isHome ? "0px" : `${el.offsetHeight}px`;
      document.body.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingTop = "";
    };
  }, [pathname, isHome]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "52px",
        backgroundColor: isTransparentNav ? "transparent" : "rgba(255,255,255,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(4px, 1.33vw, 10px)",
        transition: "transform 0.35s ease",
        transform: navHidden ? "translateY(-110%)" : "translateY(0)",
      }}
    >
      {allItems.map((item) => {
        const isActive = item === activeItem;
        return (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(isActive ? {
                paddingLeft: "clamp(14px, 3.73vw, 28px)",
                paddingRight: "clamp(14px, 3.73vw, 28px)",
                paddingTop: "clamp(6px, 1.6vw, 10px)",
                paddingBottom: "clamp(6px, 1.6vw, 10px)",
                borderRadius: "100px",
                backgroundColor: "#38b3d6",
              } : {
                paddingLeft: "clamp(10px, 2.67vw, 20px)",
                paddingRight: "clamp(10px, 2.67vw, 20px)",
                paddingTop: "clamp(6px, 1.6vw, 10px)",
                paddingBottom: "clamp(6px, 1.6vw, 10px)",
              }),
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TransitionLink href={NAV_HREFS[item] ?? "#"} style={{ textDecoration: "none" }}>
              <p style={{
                fontSize: "clamp(13px, 3.47vw, 18px)",
                fontWeight: 800,
                color: isActive ? "#f7f7f7" : "black",
                letterSpacing: "-0.36px",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}>
                {item}
              </p>
            </TransitionLink>
          </div>
        );
      })}
    </div>
  );
}

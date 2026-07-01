"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
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

export default function PersistentNav() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const activeItem = pathname.startsWith("/student/")
    ? "디자이너"
    : (PATH_TO_ITEM[pathname] ?? "거점");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      document.body.style.paddingTop = `${el.offsetHeight}px`;
      document.body.style.setProperty("--nav-height", `${el.offsetHeight}px`);
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
        height: "52px",
        backgroundColor: "rgba(255,255,255,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(4px, 0.69vw, 10px)",
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
                width: "clamp(70px, 18.7vw, 135px)",
                paddingLeft: "clamp(6px, 1.66vw, 12px)",
                paddingRight: "clamp(6px, 1.66vw, 12px)",
                paddingTop: "clamp(6px, 1.38vw, 10px)",
                paddingBottom: "clamp(6px, 1.38vw, 10px)",
                borderRadius: "100px",
                backgroundColor: "#38b3d6",
              } : {
                paddingLeft: "clamp(6px, 1.66vw, 12px)",
                paddingRight: "clamp(6px, 1.66vw, 12px)",
                paddingTop: "clamp(6px, 1.38vw, 10px)",
                paddingBottom: "clamp(6px, 1.38vw, 10px)",
              }),
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TransitionLink href={NAV_HREFS[item] ?? "#"} style={{ textDecoration: "none" }}>
              <p style={{
                fontSize: "clamp(11px, 2.49vw, 18px)",
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

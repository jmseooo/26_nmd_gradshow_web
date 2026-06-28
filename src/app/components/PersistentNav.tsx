"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
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
        // 홈: 투명 배경 → 히어로 배경이 NavBar 뒤로 꽉 채워 보임
        // 다른 페이지: 흰 배경
        backgroundColor: isHome ? "transparent" : "white",
        paddingTop: isHome ? "71px" : "clamp(10px, 4.93vw, 71px)",
        paddingLeft: "clamp(16px, 5.56vw, 80px)",
        paddingRight: "clamp(16px, 5.56vw, 80px)",
        paddingBottom: 0,
      }}
    >
      <NavBar
        activeItem={activeItem}
        // 홈: 히어로 isLight 상태와 연동 (다크/라이트 전환 시 NavBar 색상 동기화)
        // 다른 페이지: 항상 라이트(흰 배경 위 검정 텍스트)
        isLight={isHome ? isLight : true}
        compact={!isHome}
      />
    </div>
  );
}

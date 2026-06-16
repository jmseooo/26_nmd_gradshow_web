"use client";

import Link from "next/link";

const T = "0.5s ease";

const NAV_HREFS: Record<string, string> = {
  거점: "/",
  작품: "/works",
  디자이너: "#",
  방명록: "#",
  현장: "#",
};

interface Props {
  activeItem?: string; // pill 표시할 항목 (기본: "거점")
  isLight?: boolean;   // true → 라이트 색상 / false → 다크 색상
}

export default function NavBar({ activeItem = "거점", isLight = true }: Props) {
  const allItems = ["거점", "작품", "디자이너", "방명록", "현장"];

  return (
    <div className="flex items-start justify-between w-full">
      {/* ── 좌측: 학교명 + 타이틀 이미지 ────────────────── */}
      <div className="flex flex-col" style={{ width: "520.586px", height: "227px" }}>
        <div style={{ padding: "10px 28px" }}>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: isLight ? "black" : "white",
              letterSpacing: "-0.48px",
              lineHeight: 1.5,
              transition: `color ${T}`,
            }}
          >
            서울여자대학교 첨단미디어디자인전공<br />
            제2회 졸업전시
          </p>
        </div>
        <div className="relative overflow-hidden" style={{ width: "520px", height: "135px" }}>
          <img
            alt="우리의 거점"
            src="/assets/hero-title.png"
            className="absolute"
            style={{
              left: "26px", top: "24px", width: "468px", height: "85.5px", objectFit: "cover",
              filter: isLight
                ? "brightness(0) saturate(100%) invert(68%) sepia(27%) saturate(607%) hue-rotate(163deg) brightness(97%) contrast(90%)"
                : "none",
              transition: `filter ${T}`,
            }}
          />
        </div>
      </div>

      {/* ── 우측: 메뉴 아이템 ────────────────────────────── */}
      <div className="flex items-center">
        {allItems.map((item) => {
          const isActive = item === activeItem;
          // 거점이 활성이고 다크 모드 → #aedce9 / 그 외 → #38b3d6
          const pillBg   = isActive && item === "거점" && !isLight ? "#aedce9" : "#38b3d6";
          const pillText = isActive && item === "거점" && !isLight ? "#38b3d6" : "#f7f7f7";

          return (
            <div
              key={item}
              className="flex items-center justify-center"
              style={
                isActive
                  ? {
                      width: "135px",
                      backgroundColor: pillBg,
                      borderRadius: "100px",
                      padding: "10px 12px",
                      transition: `background-color ${T}`,
                    }
                  : { width: "135px", height: "65px" }
              }
              onClick={(e) => e.stopPropagation()}
            >
              <Link href={NAV_HREFS[item] ?? "#"} style={{ textDecoration: "none" }}>
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    color: isActive
                      ? pillText
                      : isLight ? "black" : "white",
                    letterSpacing: "-0.6px",
                    lineHeight: 1.5,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    transition: `color ${T}`,
                  }}
                >
                  {item}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

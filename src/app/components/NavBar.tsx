"use client";

import TransitionLink from "./TransitionLink";

const T = "0.5s ease";

const NAV_HREFS: Record<string, string> = {
  거점: "/",
  작품: "/works",
  디자이너: "/designer",
  방명록: "/guestbook",
  현장: "/field",
};

interface Props {
  activeItem?: string;
  isLight?: boolean;
  compact?: boolean;
}

export default function NavBar({ activeItem = "거점", isLight = true, compact = false }: Props) {
  const allItems = ["거점", "작품", "디자이너", "방명록", "현장"];

  const titleFilter =
    "brightness(0) saturate(100%) invert(68%) sepia(27%) saturate(607%) hue-rotate(163deg) brightness(97%) contrast(90%)";

  // 1440px 기준 → clamp (Figma 70:2835)
  const navFontSize = "clamp(13px, 2.08vw, 30px)";       // 30px
  const pillW       = "clamp(60px, 9.38vw, 135px)";      // 거점·작품 고정 폭 135px
  const pillPadV    = "clamp(4px, 0.69vw, 10px)";        // py 10px
  const pillPadH    = "clamp(5px, 0.83vw, 12px)";        // px 12px (pill 슬롯)
  const textPadH    = "clamp(12px, 2.08vw, 30px)";       // px 30px (디자이너·방명록·현장)
  const navGap      = "clamp(4px, 0.69vw, 10px)";        // gap 10px

  return (
    <div className="flex items-start justify-between w-full" style={{ gap: "clamp(8px, 1.39vw, 20px)" }}>

      {/* ── 좌측 ────────────────────────────────────────── */}
      {compact ? (
        /* 서브페이지용 컴팩트 버전 (Figma 70:2832) */
        <div className="flex flex-col flex-shrink-0" style={{ gap: "clamp(4px, 0.56vw, 8px)" }}>
          <p
            style={{
              fontSize: "clamp(9px, 0.83vw, 12px)",
              fontWeight: 600,
              color: "black",
              letterSpacing: "-0.24px",
              lineHeight: 1.5,
              whiteSpace: "nowrap",
            }}
          >
            서울여자대학교 첨단미디어디자인전공<br />
            제2회 졸업전시
          </p>
          <TransitionLink href="/" style={{ textDecoration: "none", lineHeight: 0 }}>
            <img
              alt="우리의 거점"
              src="/assets/hero-title.png"
              style={{
                width: "clamp(90px, 14.44vw, 208px)",
                height: "clamp(17px, 2.64vw, 38px)",
                objectFit: "cover",
                filter: titleFilter,
                cursor: "pointer",
              }}
            />
          </TransitionLink>
        </div>
      ) : (
        /* 히어로용 풀사이즈 버전 */
        <div
          className="flex flex-col flex-shrink-0"
          style={{ width: "clamp(180px, 36.15vw, 520px)" }}
        >
          <div style={{ padding: "clamp(4px, 0.69vw, 10px) clamp(10px, 1.94vw, 28px)" }}>
            <p
              style={{
                fontSize: "clamp(11px, 1.67vw, 24px)",
                fontWeight: 600,
                color: isLight ? "black" : "white",
                letterSpacing: "-0.48px",
                lineHeight: 1.5,
                transition: `color ${T}`,
                whiteSpace: "nowrap",
              }}
            >
              서울여자대학교 첨단미디어디자인전공<br />
              제2회 졸업전시
            </p>
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              width: "clamp(180px, 36.11vw, 520px)",
              height: "clamp(33px, 9.38vw, 135px)",
            }}
          >
            <img
              alt="우리의 거점"
              src="/assets/hero-title.png"
              className="absolute"
              style={{
                left: "clamp(10px, 1.81vw, 26px)",
                top: "clamp(10px, 1.67vw, 24px)",
                width: "clamp(140px, 32.5vw, 468px)",
                height: "clamp(26px, 5.94vw, 85.5px)",
                objectFit: "cover",
                filter: isLight ? titleFilter : "none",
                transition: `filter ${T}`,
              }}
            />
          </div>
        </div>
      )}

      {/* ── 우측: 메뉴 아이템 ────────────────────────────── */}
      <div className="flex items-center flex-shrink-0" style={{ gap: navGap }}>
        {allItems.map((item) => {
          const isActive  = item === activeItem;
          const isPillSlot = item === "거점" || item === "작품"; // 고정 폭 슬롯
          const pillBg    = isActive && item === "거점" && !isLight ? "#aedce9" : "#38b3d6";
          const pillText  = isActive && item === "거점" && !isLight ? "#38b3d6" : "#f7f7f7";

          return (
            <div
              key={item}
              className="flex items-center justify-center"
              style={{
                // pill 슬롯(거점·작품): 135px 고정 폭 + 12px 수평 패딩
                // 나머지(디자이너·방명록·현장): 폭 auto + 30px 수평 패딩
                ...(isPillSlot
                  ? { width: pillW, padding: `${pillPadV} ${pillPadH}` }
                  : { padding: `${pillPadV} ${textPadH}` }),
                borderRadius: "100px",
                backgroundColor: isActive ? pillBg : "transparent",
                transition: `background-color ${T}`,
                flexShrink: 0,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <TransitionLink href={NAV_HREFS[item] ?? "#"} style={{ textDecoration: "none" }}>
                <p
                  style={{
                    fontSize: navFontSize,
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
              </TransitionLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

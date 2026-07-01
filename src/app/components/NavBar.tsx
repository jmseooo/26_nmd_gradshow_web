"use client";

import { useState, useRef, useEffect } from "react";
import TransitionLink from "./TransitionLink";

const T = "0.5s ease";

const NAV_HREFS: Record<string, string> = {
  거점: "/", 작품: "/works", 디자이너: "/designer", 방명록: "/guestbook", 현장: "/field",
};

interface Props { activeItem?: string; isLight?: boolean; compact?: boolean; }

export default function NavBar({ activeItem = "거점", isLight = true, compact = false }: Props) {
  const allItems = ["거점", "작품", "디자이너", "방명록"]; /* "현장" 비공개 */

  const titleFilter =
    "brightness(0) saturate(100%) invert(68%) sepia(27%) saturate(607%) hue-rotate(163deg) brightness(97%) contrast(90%)";

  const navFontSize = "clamp(13px, 2.08vw, 30px)";
  const pillW       = "clamp(60px, 9.38vw, 135px)";
  const pillPadV    = "clamp(4px, 0.69vw, 10px)";
  const pillPadH    = "clamp(5px, 0.83vw, 12px)";
  const textPadH    = "clamp(12px, 2.08vw, 30px)";
  const navGap      = "clamp(4px, 0.69vw, 10px)";

  const [hideNav, setHideNav] = useState(false);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (compact) return;
    const check = () => {
      const el = measureRef.current;
      if (!el) return;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const pt         = parseFloat(getComputedStyle(el).paddingTop);
      const pb         = parseFloat(getComputedStyle(el).paddingBottom);
      setHideNav(el.offsetHeight > Math.round(lineHeight + pt + pb) + 2);
    };
    let timer: ReturnType<typeof setTimeout>;
    const debouncedCheck = () => { clearTimeout(timer); timer = setTimeout(check, 120); };
    check();
    window.addEventListener("resize", debouncedCheck);
    return () => { window.removeEventListener("resize", debouncedCheck); clearTimeout(timer); };
  }, [compact]);

  // 가로 레이아웃 nav 아이템
  const navItems = allItems.map((item) => {
    const isActive   = item === activeItem;
    const isPillSlot = item === "거점" || item === "작품";
    const pillBg     = isActive && item === "거점" && !isLight ? "#aedce9" : "#38b3d6";
    const pillText   = isActive && item === "거점" && !isLight ? "#38b3d6" : "#f7f7f7";
    return (
      <div
        key={item}
        className="flex items-center justify-center"
        style={{
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
          <p style={{
            fontSize: navFontSize,
            fontWeight: 800,
            color: isActive ? pillText : isLight ? "black" : "white",
            letterSpacing: "-0.6px",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            textAlign: "center",
            transition: `color ${T}`,
          }}>
            {item}
          </p>
        </TransitionLink>
      </div>
    );
  });

  // 중앙 세로 레이아웃 nav 아이템 (Figma 121:391–397 기준)
  const centeredNavItems = allItems.map((item) => {
    const isActive = item === activeItem;
    return (
      <div
        key={`c-${item}`}
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
  });

  return (
    <>
      <style>{`
        @keyframes nav-bg-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-content-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── 중앙 세로 레이아웃 (비-compact + hideNav) ──────── */}
      {!compact && hideNav && (
        <>
          {/* 흰 배경 + 네비 항목 — absolute, 수직 중앙 정렬 (피그마 214:51) */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "52px",
            backgroundColor: "rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: navGap,
            animation: "nav-bg-in 0.3s ease-out both",
          }}>
            {centeredNavItems}
          </div>

          {/* 타이틀 + 서브타이틀 — 흰 바 아래로 */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            width: "100%",
            marginTop: "calc(52px + 8px - clamp(0px, 2.5vw, 36px))",
            animation: "nav-content-in 0.35s ease-out 0.05s both",
          }}>
            {/* 타이틀 컨테이너 (Figma 121:501: 520×135, overflow-clip, mb=-12) */}
            <div style={{
              width: "min(520px, 100%)",
              height: "135px",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
              marginBottom: "-12px",
            }}>
              <img
                alt="우리의 거점"
                src="/assets/hero-title.png"
                style={{
                  position: "absolute",
                  left: "26px",
                  top: "24px",
                  width: "calc(100% - 52px)",
                  height: "auto",
                  filter: isLight ? titleFilter : "none",
                  transition: `filter ${T}`,
                }}
              />
            </div>

            {/* 서브타이틀 (Figma 121:503–504: px=28, py=10, 22px SemiBold) */}
            <div style={{
              width: "min(520px, 100%)",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 26px",
              marginTop: "-10px",
            }}>
              <p style={{
                fontSize: "clamp(11px, 3.05vw, 22px)",
                fontWeight: 600,
                color: isLight ? "black" : "white",
                lineHeight: 1.5,
                textAlign: "center",
                transition: `color ${T}`,
              }}>
                서울여자대학교 첨단미디어디자인전공 제2회 졸업전시
              </p>
            </div>
          </div>
        </>
      )}

      {/* ── 가로 레이아웃 (compact 또는 hideNav=false) ───── */}
      {(compact || !hideNav) && (
        <>
          <div className="flex items-center w-full" style={{ gap: "clamp(8px, 1.39vw, 20px)", overflow: "hidden" }}>
            {compact ? (
              <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, alignSelf: "flex-start" }}>
                <TransitionLink href="/" style={{ textDecoration: "none", lineHeight: 0 }}>
                  <img
                    alt="우리의 거점"
                    src="/assets/title-geomjeom-blue.png"
                    style={{
                      width: "clamp(160px, 13.61vw, 196px)",
                      height: "auto",
                      display: "block",
                      marginLeft: "2px",
                      cursor: "pointer",
                    }}
                  />
                </TransitionLink>
                <p style={{
                  fontSize: "clamp(10px, 0.83vw, 12px)",
                  fontWeight: 600,
                  color: "black",
                  letterSpacing: "-0.24px",
                  lineHeight: 1.5,
                  whiteSpace: "nowrap",
                  marginTop: "11px",
                  marginLeft: "2px",
                }}>
                  서울여자대학교 첨단미디어디자인전공 제2회 졸업전시
                </p>
              </div>
            ) : (
              <div
                className="relative overflow-hidden flex-shrink-0"
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
                    left: 0,
                    top: "clamp(10px, 1.67vw, 24px)",
                    width: "clamp(140px, 32.5vw, 468px)",
                    height: "clamp(26px, 5.94vw, 85.5px)",
                    objectFit: "cover",
                    filter: isLight ? titleFilter : "none",
                    transition: `filter ${T}`,
                  }}
                />
              </div>
            )}
            <div className="flex items-center flex-shrink-0" style={{ gap: navGap, marginLeft: "auto" }}>
              {navItems}
            </div>
          </div>

          {!compact && (
            <p style={{
              fontSize: "clamp(10px, 1.53vw, 22px)",
              fontWeight: 600,
              color: isLight ? "black" : "white",
              letterSpacing: "0",
              lineHeight: 1.5,
              transition: `color ${T}`,
              width: "clamp(140px, 32.5vw, 468px)",
              marginLeft: 0,
              paddingTop: "clamp(4px, 0.69vw, 10px)",
              paddingBottom: "clamp(4px, 0.69vw, 10px)",
              marginTop: "clamp(-6px, -0.833vw, -12px)",
            }}>
              서울여자대학교 첨단미디어디자인전공 제2회 졸업전시
            </p>
          )}
        </>
      )}

      {/* ── 측정 전용 숨김 element (항상 DOM에 존재, 레이아웃 전환 감지용) ── */}
      {!compact && (
        <p
          ref={measureRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            width: "clamp(140px, 32.5vw, 468px)",
            fontSize: "clamp(10px, 1.53vw, 22px)",
            fontWeight: 600,
            lineHeight: 1.5,
            paddingTop: "clamp(4px, 0.69vw, 10px)",
            paddingBottom: "clamp(4px, 0.69vw, 10px)",
          }}
        >
          서울여자대학교 첨단미디어디자인전공 제2회 졸업전시
        </p>
      )}
    </>
  );
}

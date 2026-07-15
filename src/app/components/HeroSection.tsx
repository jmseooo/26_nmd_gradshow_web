"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useHeroLight } from "./HeroLightContext";
import NetworkGraphCanvas from "./NetworkGraphCanvas";

/* ─── 배경 이미지 ─────────────────────────────────────────────── */
const img1Dark   = "/assets/hero-bg1.webp";
const img1Light  = "/nmd_asset01.png";
const img2       = "/assets/hero-bg3.webp";
const imgVector1 = "/assets/hero-vector.svg";

const INITIAL_BUBBLES: string[] = [];

const T = "0.75s ease";

const titleFilter =
  "brightness(0) saturate(100%) invert(68%) sepia(27%) saturate(607%) hue-rotate(163deg) brightness(97%) contrast(90%)";

type Bubble = { id: number; text: string };
let nextId = 0;

export default function HeroSection() {
  const { isLight, toggle } = useHeroLight();
  const [hasEverBeenLight, setHasEverBeenLight] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [stackedLayout, setStackedLayout] = useState(false);
  const [narrowHero, setNarrowHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 480) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isLight) setHasEverBeenLight(true);
  }, [isLight]);

  useEffect(() => {
    const check = () => {
      setStackedLayout(window.innerWidth < 640);
      setNarrowHero(window.innerWidth < 900);
      setIsMobile(window.innerWidth < 480);
    };
    let timer: ReturnType<typeof setTimeout>;
    const debouncedCheck = () => { clearTimeout(timer); timer = setTimeout(check, 120); };
    check();
    window.addEventListener("resize", debouncedCheck, { passive: true });
    return () => { window.removeEventListener("resize", debouncedCheck); clearTimeout(timer); };
  }, []);

  const submitMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;
    setBubbles((prev) => [...prev.slice(-8), { id: nextId++, text }]);
    setInputValue("");
    inputRef.current?.focus();
    await supabase.from("guestbook").insert({ message: text });
  };

  return (
    <section
      className="relative overflow-hidden"
      onPointerDown={() => toggle()}
      style={{
        width: "100%",
        height: "100svh",
        backgroundColor: isLight ? "white" : "#0a99d1",
        transition: `background-color ${T}`,
        cursor: "pointer",
      }}
    >
      {/* ── 다크 배경 레이어 ─────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ opacity: isLight ? 0 : 1, transition: `opacity ${T}`, pointerEvents: "none", willChange: "opacity" }}
      >
        <div className="absolute bg-[#0fa7d2] h-full left-0 overflow-clip top-0 w-full">
          <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img1Dark} fetchPriority="high" />
          </div>
        </div>
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
          <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img2} fetchPriority="high" />
        </div>
      </div>

      {/* ── 라이트 배경 레이어 — 첫 토글 전까지 마운트 안 함 (초기 로드 절약) */}
      {hasEverBeenLight && (
        <div
          className="absolute inset-0"
          style={{ opacity: isLight ? 1 : 0, transition: `opacity ${T}`, pointerEvents: "none", willChange: "opacity" }}
        >
          <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img1Light} />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(174,220,233,0.2), rgba(250,250,248,0.2) 50%, rgba(174,220,233,0.2))",
            }}
          />
        </div>
      )}

      {/* ── 네트워크 그래프 ──────────────────────────────── */}
      <NetworkGraphCanvas />

      {/* ── Vector 장식 — 다크/라이트 공통 (같은 파일, 항상 표시) */}
      <div
        className="absolute"
        style={{
          top: "65.06%",
          ...(narrowHero
            ? { left: "50%", transform: "translateX(-50%)", width: "max(83.2vw, 80vh)" }
            : { left: "20.76%", width: "max(58.48vw, 80vh)" }),
          aspectRatio: "842 / 480",
          pointerEvents: "none",
        }}
      >
        <img alt="" className="absolute block inset-0 size-full" src={imgVector1} fetchPriority="high" />
      </div>

      {/* ── 모바일 전용: 타이틀 + 서브타이틀 ────────── */}
      {isMobile && (
        <div
          className="absolute pointer-events-none"
          style={{ top: "80px", left: "24px", right: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <img
            alt="우리의 거점"
            src="/assets/hero-title.png"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: isLight ? titleFilter : "none",
              transition: `filter ${T}`,
            }}
          />
          <p style={{
            fontSize: "clamp(13px, 3.6vw, 18px)",
            fontWeight: 600,
            color: isLight ? "black" : "white",
            lineHeight: 1.5,
            marginTop: "6px",
            textAlign: "center",
            transition: `color ${T}`,
          }}>
            서울여자대학교 첨단미디어디자인전공 제2회 졸업전시
          </p>
        </div>
      )}

      {/* ── 말풍선 ────────────────────────────────────── */}
      <style>{`
        @keyframes bubble-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="absolute"
        style={{ right: "clamp(16px, 5.63vw, 81px)", bottom: "18%", width: "clamp(200px, 25.49vw, 367px)", height: "432px", zIndex: 10 }}
      >
        {bubbles.map(({ id, text }, i) => {
          const fromBottom = (bubbles.length - 1 - i) * 48;
          const isNew = i === bubbles.length - 1;
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                bottom: `${fromBottom}px`,
                right: 0,
                transition: "bottom 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: "38px", padding: "6px 12px",
                borderRadius: "24px",
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(2px)",
                boxShadow: "0px 0px 10px 0px rgba(0,184,238,0.24)",
                wordBreak: "break-all",
                ...(isNew && {
                  animation: "bubble-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                  willChange: "transform, opacity",
                }),
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#202024", textAlign: "center" }}>
                {text}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── 방명록 입력창 ─────────────────────────────── */}
      <div
        className="absolute flex items-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          zIndex: 10,
          ...(stackedLayout
            ? {
                left: "calc(clamp(16px, 5.56vw, 80px) + 30px)",
                right: "calc(clamp(16px, 5.56vw, 80px) + 30px)",
              }
            : {
                right: "clamp(16px, 5.63vw, 81px)",
                width: "clamp(200px, 25.49vw, 367px)",
              }),
          top: "87.82%",
          height: "clamp(40px, 3.68vw, 53px)",
          backgroundColor: "white", borderRadius: "100px",
          overflow: "hidden",
          padding: "0 clamp(14px, 1.39vw, 20px)",
          gap: "10px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="guestbook"
          placeholder="응원을 적어주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) submitMessage(); }}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "clamp(12px, 1.25vw, 18px)",
            fontWeight: 600,
            color: "#202024",
            letterSpacing: "-0.36px",
            fontFamily: "inherit",
          }}
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          onClick={submitMessage}
          style={{
            width: "clamp(20px, 1.67vw, 24px)",
            height: "clamp(20px, 1.67vw, 24px)",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <path d="M3.631 2.122C2.7375 1.6755 1.7485 2.528 2.058 3.4775L4.065 9.63C4.12176 9.80382 4.2251 9.95874 4.36377 10.0779C4.50244 10.1971 4.67113 10.276 4.8515 10.306L12.7815 11.6275C13.199 11.6975 13.199 12.2975 12.7815 12.3675L4.852 13.689C4.67163 13.719 4.50294 13.7979 4.36427 13.9171C4.2256 14.0363 4.12226 14.1912 4.0655 14.365L2.058 20.521C1.748 21.471 2.7375 22.3235 3.631 21.877L21.378 13.006C22.2075 12.591 22.2075 11.4075 21.378 10.993L3.631 2.122Z" fill="#38B4D7" />
        </svg>
      </div>
    </section>
  );
}

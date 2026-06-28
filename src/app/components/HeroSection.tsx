"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useHeroLight } from "./HeroLightContext";

/* ─── 배경 이미지 ─────────────────────────────────────────────── */
const img1Dark   = "/assets/hero-bg1.svg";
const img1Light  = "/nmd_asset01.png";
const img2       = "/assets/hero-bg3.svg";
const imgVector1 = "/assets/hero-vector.svg";

const INITIAL_BUBBLES: string[] = [];

const T = "0.5s ease";

type Bubble = { id: number; text: string };
let nextId = 0;

export default function HeroSection() {
  const { isLight, toggle } = useHeroLight();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [stackedLayout, setStackedLayout] = useState(false);
  const [narrowHero, setNarrowHero] = useState(false);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    [img1Dark, img1Light, img2, imgVector1].forEach((src) => {
      const el = new Image();
      el.src = src;
    });
  }, []);

  useEffect(() => {
    const check = () => {
      setStackedLayout(window.innerWidth < 640);
      setNarrowHero(window.innerWidth < 900);
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
      onClick={() => toggle()}
      style={{
        width: "100%",
        height: "100vh",
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
            <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img1Dark} />
          </div>
        </div>
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
          <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img2} />
        </div>
      </div>

      {/* ── 라이트 배경 레이어 (node 66-2294) ───────────── */}
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

      {/* ── Vector 장식 (라이트 모드) — 원본 비율(1684:842) 유지, 아래는 section overflow-hidden에 잘힘 */}
      <div
        className="absolute"
        style={{
          ...(narrowHero
            ? { top: "70.73%", left: "50%", transform: "translateX(-50%)", width: "clamp(300px, 83.2vw, 657px)" }
            : { top: "65.06%", left: "20.76%", width: "58.48%" }),
          aspectRatio: "1684 / 842",
          opacity: isLight ? 1 : 0,
          transition: `opacity ${T}`,
          pointerEvents: "none",
          willChange: "opacity",
        }}
      >
        <img alt="" className="absolute block inset-0 size-full" src="/assets/hero-hemisphere-light.png" />
      </div>

      {/* ── Vector 장식 (다크 모드) — 원본 비율(842:480) 유지, 아래는 section overflow-hidden에 잘힘 */}
      <div
        className="absolute"
        style={{
          ...(narrowHero
            ? { top: "70.73%", left: "50%", transform: "translateX(-50%)", width: "clamp(300px, 83.2vw, 657px)" }
            : { top: "65.06%", left: "20.76%", width: "58.48%" }),
          aspectRatio: "842 / 480",
          opacity: isLight ? 0 : 1,
          transition: `opacity ${T}`,
          pointerEvents: "none",
          willChange: "opacity",
        }}
      >
        <img alt="" className="absolute block inset-0 size-full" src={imgVector1} />
      </div>

      {/* ── 말풍선 ────────────────────────────────────── */}
      <style>{`
        @keyframes bubble-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="absolute"
        style={{ right: "clamp(16px, 5.63vw, 81px)", bottom: "18%", width: "clamp(120px, 13.89vw, 200px)", height: "432px" }}
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
                transition: "bottom 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "38px", padding: "0 12px",
                borderRadius: "100px",
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(2px)",
                boxShadow: "0px 0px 10px 0px rgba(0,184,238,0.24)",
                whiteSpace: "nowrap",
                ...(isNew && {
                  animation: "bubble-rise 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
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
          placeholder="남기고 싶은 말이 있나요?"
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
          <path d="M3.631 2.122C2.7375 1.6755 1.7485 2.528 2.058 3.4775L4.065 9.63C4.12176 9.80382 4.2251 9.95874 4.36377 10.0779C4.50244 10.1971 4.67113 10.276 4.8515 10.306L12.7815 11.6275C13.199 11.6975 13.199 12.2975 12.7815 12.3675L4.852 13.689C4.67163 13.719 4.50294 13.7979 4.36427 13.9171C4.2256 14.0363 4.12226 14.1912 4.0655 14.365L2.058 20.521C1.748 21.471 2.7375 22.3235 3.631 21.877L21.378 13.006C22.2075 12.591 22.2075 11.4075 21.378 10.993L3.631 2.122Z" fill="#ADADAD" />
        </svg>
      </div>
    </section>
  );
}

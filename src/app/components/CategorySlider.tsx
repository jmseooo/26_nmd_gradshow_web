"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

function txt(size: number, weight: number, color: string, tracking = -0.02): CSSProperties {
  const min = Math.max(10, Math.round(size * 0.45));
  return {
    fontSize: `clamp(${min}px, ${((size / 1440) * 100).toFixed(3)}vw, ${size}px)`,
    fontWeight: weight,
    color,
    letterSpacing: `${tracking * size}px`,
    lineHeight: 1.5,
  };
}

const categories = [
  { color: "#b8d870", cardBg: "#e6f6c3", label: "XR" },
  { color: "#e7b871", cardBg: "#ffeaca", label: "MOTION" },
  { color: "#e99fa9", cardBg: "#ffeef0", label: "UI" },
  { color: "#9898c8", cardBg: "#eeeeff", label: "UX" },
];

export default function CategorySlider() {
  const [active, setActive] = useState(0);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + categories.length) % categories.length);

  const cat = categories[active];

  return (
    <section className="bg-white" style={{ padding: "clamp(32px, 5.56vw, 80px) clamp(16px, 4.44vw, 64px)" }}>
      <style>{`
        @keyframes cat-slide-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-slide-up { animation: cat-slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      {/* 도트 행 */}
      <div className="flex flex-col items-center" style={{ marginBottom: "clamp(20px, 3.47vw, 50px)" }}>
        <div className="flex items-end" style={{ gap: "clamp(10px, 1.53vw, 22px)" }}>
          {categories.map((c, i) => (
            <div key={c.label} className="flex flex-col items-center" style={{ gap: "clamp(3px, 0.42vw, 6px)" }}>
              {/* 레이블 텍스트 (슬라이드업) */}
              <p
                style={{
                  ...txt(12, 600, "black"),
                  height: "18px",
                  display: "flex",
                  alignItems: "flex-end",
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </p>
              {/* 도트 버튼 */}
              <button
                onClick={() => setActive(i)}
                aria-label={c.label}
                style={{
                  backgroundColor: c.color,
                  width: "clamp(14px, 2.08vw, 30px)",
                  height: "clamp(14px, 2.08vw, 30px)",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  outline: "none",
                  flexShrink: 0,
                  transition: "transform 0.2s ease",
                  transform: active === i ? "scale(1.2)" : "scale(1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 슬라이더 */}
      <div className="flex items-center" style={{ gap: "clamp(8px, 1.11vw, 16px)" }}>
        {/* 이전 화살표 */}
        <button
          onClick={() => go(-1)}
          style={{
            flexShrink: 0,
            width: "clamp(32px, 4.44vw, 64px)",
            height: "clamp(32px, 4.44vw, 64px)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transform: "rotate(180deg)",
          }}
        >
          <img alt="이전" src="/assets/arrow-forward.svg" style={{ width: "100%", height: "100%" }} />
        </button>

        {/* 카드 (key 바뀌면 슬라이드업 애니메이션 재생) */}
        <div
          key={active}
          className="cat-slide-up flex-1"
          style={{ backgroundColor: cat.cardBg, minWidth: "480px", overflow: "hidden" }}
        >
          {/* 헤더 행 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {[cat.label, "개요", "교수님"].map((h) => (
              <p
                key={h}
                style={{
                  ...txt(18, 800, "black"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(10px, 1.32vw, 19px) 0",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </p>
            ))}
          </div>

          {/* 데이터 행 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              padding: "clamp(16px, 5.76vw, 83px) 0",
              alignItems: "start",
            }}
          >
            {/* 왼쪽: 작품·참여자 */}
            <div
              className="flex flex-col items-center"
              style={{ gap: "clamp(12px, 4.17vw, 60px)", padding: "0 clamp(8px, 1.11vw, 16px)" }}
            >
              <p className="whitespace-nowrap underline" style={txt(18, 600, "black")}>
                작품, 3개
              </p>
              <div className="flex flex-col items-center" style={{ gap: "clamp(4px, 0.56vw, 8px)" }}>
                <p className="whitespace-nowrap" style={txt(18, 600, "black")}>참여자, 4명</p>
                {["성이름", "성이름", "성이름", "성이름"].map((name, j) => (
                  <p key={j} className="whitespace-nowrap" style={txt(18, 200, "#828282")}>
                    {name}
                  </p>
                ))}
              </div>
            </div>

            {/* 중간: 개요 */}
            <div style={{ padding: "0 clamp(10px, 2.08vw, 30px)" }}>
              <p style={{ ...txt(12, 400, "#63636e"), lineHeight: 1.7 }}>
                어쩌구 그래서 이런 것을 전시합니다 그래서 이런 것을 준비했는데 예쁘게 봐주세요
                어쩌구 그래서 이런 것을 전시합니다 그래서 이런 것을 준비했는데 예쁘게 봐주세요
              </p>
            </div>

            {/* 오른쪽: 교수님 */}
            <div className="flex justify-center" style={{ padding: "0 clamp(8px, 1.11vw, 16px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 400, "black")}>유영재 교수님</p>
            </div>
          </div>
        </div>

        {/* 다음 화살표 */}
        <button
          onClick={() => go(1)}
          style={{
            flexShrink: 0,
            width: "clamp(32px, 4.44vw, 64px)",
            height: "clamp(32px, 4.44vw, 64px)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <img alt="다음" src="/assets/arrow-forward.svg" style={{ width: "100%", height: "100%" }} />
        </button>
      </div>
    </section>
  );
}

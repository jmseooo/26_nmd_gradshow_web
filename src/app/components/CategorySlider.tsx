"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { works } from "@/lib/works-data";
import TransitionLink from "./TransitionLink";

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
  { color: "#b8d870", cardBg: "#e6f6c3", label: "XR", description: "XR캡스톤디자인은 단순한 기술 습득을 넘어, 인간의 감각을 확장하고 물리적 시공간의 한계를 뛰어넘는 창의적인 경험을 설계하는 데 목표를 두고 있다.\n3차원 공간 내의 몰입형 스토리텔링, 그리고 최신 실감 미디어 기술과 디자인의 실무적 융합을 다룬다.\n작품들은 경험의 확장이라는 공통된 지향점 아래, 각자의 독창적인 시각과 상상력을 완성도 높은 미디어로 구현했다. 가상과 현실의 경계를 허무는 무한한 가능성의 공간 속으로 직접 들어가 학생들이 설계한 미디어 여정을 체험할 수 있다." },
  { color: "#e7b871", cardBg: "#ffeaca", label: "MOTION", description: "영상모션캡스톤디자인은 하나의 주제를 영상 언어로 풀어내기 위해 기획부터 연출, 디자인, 제작까지의 전 과정을 다룬다.\n브랜드 필름, 단편영상, 실험영상, 모션그래픽 기반 영상 등 다양한 형식의 작품들은 단순한 시각적 결과물에 머무르지 않고, 각자가 붙잡은 질문과 문제의식에서 출발한다.\n각 작품이 어떤 질문에서 출발했는지, 그리고 그 질문이 이미지와 움직임, 사운드, 편집을 거쳐 하나의 영상으로 완성되는 과정을 따라가며 감상할 수 있다." },
  { color: "#e99fa9", cardBg: "#ffeef0", label: "UI", description: "UI캡스톤디자인은 사용자 리서치와 정보구조 설계, 화면 흐름, UI 디자인, 프로토타이핑, 앱 개발을 거쳐 앱스토어 등록까지 이어지는 전 과정을 다룬다.\n아이디어는 모바일 앱 서비스로 설계되고, 인터페이스는 실제 작동하는 애플리케이션으로 구현된다. AI를 비롯한 최신 디지털 도구는 기획과 디자인, 개발의 가능성을 확장하는 창작 파트너로 활용된다.\n단순한 콘셉트나 화면 제안을 넘어, 실제로 사용 가능한 디지털 프로덕트를 감상할 수 있다." },
  { color: "#9898c8", cardBg: "#eeeeff", label: "UX", description: "UX캡스톤디자인은 사용자에게 실질적인 가치를 제공하는 유용함을 바탕으로 아직 익숙하지 않은 기술과 관점을 통해 새로움의 가능성을 탐색한다.\n디자인이 아름다움과 유용함, 새로움과 익숙함 사이에서 절묘한 균형을 찾아내는 일이라면, UX디자인은 그 균형 속에서 사용자의 경험을 구체적으로 설계하는 과정이다.\n각 작품은 제품의 사용성, 기술과 인간의 욕구, 디자인을 수행하고 검증하는 과정, 익숙한 주제를 바라보는 다른 시선 등 여러 층위의 새로움을 따라가며, 하나의 사용자 경험으로 확장되어 가는 흐름을 보여준다." },
].map((c) => ({ ...c, count: works.filter((w) => w.category === c.label).length }));

export default function CategorySlider() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("returnToCategory")) {
      sessionStorage.removeItem("returnToCategory");
      setTimeout(() => {
        document.getElementById("category-slider")?.scrollIntoView({ behavior: "instant" });
      }, 50);
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + categories.length) % categories.length);

  const cat = categories[active];

  return (
    <section id="category-slider" className="bg-white overflow-hidden" style={{ padding: "clamp(32px, 5.56vw, 80px) 0" }}>
      <style>{`
        @keyframes cat-slide-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-slide-up { animation: cat-slide-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
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
                  transition: "opacity 0.45s ease, transform 0.45s ease",
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
                  transition: "transform 0.3s ease",
                  transform: active === i ? "scale(1.2)" : "scale(1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 슬라이더 — 화살표·카드 가운데 정렬, 양쪽 여백 134px */}
      <div
        className="flex items-center justify-center"
        style={{
          padding: isMobile ? "0 24px" : "0 clamp(24px, 9.31vw, 134px)",
          gap: "clamp(16px, 7.15vw, 103px)",
        }}
      >
        {/* 이전 화살표 */}
        {!isMobile && (
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
          }}
        >
          <svg viewBox="0 0 47.9999 47.9999" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", transform: "rotate(180deg)" }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M22.1144 47.2189C21.0731 46.1776 21.0731 44.4891 22.1144 43.4477L38.8955 26.6667H2.66667C1.19392 26.6667 0 25.4728 0 24C0 22.5272 1.19392 21.3333 2.66667 21.3333H38.8955L22.1144 4.55229C21.0731 3.51088 21.0731 1.82245 22.1144 0.78104C23.1557 -0.260347 24.8443 -0.260347 25.8856 0.78104L47.2189 22.1144C48.2603 23.1557 48.2603 24.8443 47.2189 25.8856L25.8856 47.2189C24.8443 48.2603 23.1557 48.2603 22.1144 47.2189Z" fill={cat.color} style={{ transition: "fill 0.35s ease" }} />
          </svg>
        </button>
        )}

        {/* 카드: 838px 고정 너비, key 바뀌면 슬라이드업 */}
        <div
          key={active}
          className="cat-slide-up"
          style={{
            backgroundColor: cat.cardBg,
            width: isMobile ? "100%" : "clamp(200px, 58.19vw, 838px)",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* 헤더 행 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 7fr 4fr",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ ...txt(18, 800, "black"), padding: "clamp(10px, 1.32vw, 19px) clamp(16px, 3.33vw, 48px)", whiteSpace: "nowrap" }}>
              {cat.label}
            </p>
            <p style={{ ...txt(18, 800, "black"), padding: "clamp(10px, 1.32vw, 19px) clamp(16px, 3.33vw, 48px)", whiteSpace: "nowrap" }}>
              개요
            </p>
            <p style={{ ...txt(18, 800, "black"), padding: "clamp(10px, 1.32vw, 19px) clamp(16px, 3.33vw, 48px)", whiteSpace: "nowrap" }}>
              교수님
            </p>
          </div>

          {/* 데이터 행 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 7fr 4fr",
              padding: "22px 0",
              alignItems: "start",
            }}
          >
            {/* 왼쪽: 작품·참여자 */}
            <div
              className="flex flex-col items-start"
              style={{ gap: "clamp(12px, 4.17vw, 60px)", padding: "0 clamp(16px, 3.33vw, 48px)" }}
            >
              <div onClick={() => sessionStorage.setItem("returnToCategory", "1")}>
                <TransitionLink href={`/works?category=${cat.label}`} style={{ textDecoration: "none" }}>
                  <p className="whitespace-nowrap underline" style={{ ...txt(18, 600, "black"), cursor: "pointer" }}>
                    작품, {cat.count}개
                  </p>
                </TransitionLink>
              </div>
              <div className="flex flex-col items-start" style={{ gap: "clamp(4px, 0.56vw, 8px)" }}>
                <p className="whitespace-nowrap" style={txt(18, 600, "black")}>참여자, 4명</p>
              </div>
            </div>

            {/* 중간: 개요 */}
            <div style={{ padding: "0 clamp(16px, 3.33vw, 48px)" }}>
              <p style={{ ...txt(18, 400, "#63636e"), lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {cat.description}
              </p>
            </div>

            {/* 오른쪽: 교수님 */}
            <div style={{ padding: "0 clamp(16px, 3.33vw, 48px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 400, "black")}>유영재 교수님</p>
            </div>
          </div>
        </div>

        {/* 다음 화살표 */}
        {!isMobile && (
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
          <svg viewBox="0 0 47.9999 47.9999" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M22.1144 47.2189C21.0731 46.1776 21.0731 44.4891 22.1144 43.4477L38.8955 26.6667H2.66667C1.19392 26.6667 0 25.4728 0 24C0 22.5272 1.19392 21.3333 2.66667 21.3333H38.8955L22.1144 4.55229C21.0731 3.51088 21.0731 1.82245 22.1144 0.78104C23.1557 -0.260347 24.8443 -0.260347 25.8856 0.78104L47.2189 22.1144C48.2603 23.1557 48.2603 24.8443 47.2189 25.8856L25.8856 47.2189C24.8443 48.2603 23.1557 48.2603 22.1144 47.2189Z" fill={cat.color} style={{ transition: "fill 0.35s ease" }} />
          </svg>
        </button>
        )}
      </div>
    </section>
  );
}

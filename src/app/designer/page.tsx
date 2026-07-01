"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { designers } from "@/lib/designers";

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

export default function DesignerPage() {
  const router = useRouter();
  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative"
      style={{
        fontFamily: "Pretendard, sans-serif",
        marginTop: "calc(-1 * var(--nav-height, 0px))",
        paddingTop: "var(--nav-height, 0px)",
      }}
    >
      {/* 배경 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.4 }}>
        <div className="absolute w-full" style={{ top: "-278.92px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute w-full" style={{ top: "1166px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* 배너 */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "clamp(280px, 39.38vw, 567px)", left: 0, width: "100%", height: "clamp(148px, 21.6vw, 311px)", zIndex: 1 }}
      >
        <img alt="" src="/assets/designer-banner.svg" className="w-full h-full object-cover" />
      </div>

      {/* 컨텐츠 */}
      <div className="relative" style={{ zIndex: 2 }}>
        <div
          className="designer-grid-padding"
          style={{ paddingTop: "clamp(24px, 5.56vw, 80px)" }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{
              columnGap: "clamp(12px, 2.08vw, 30px)",
              rowGap: "clamp(12px, 1.39vw, 20px)",
            }}
          >
            {designers.map((d) => (
              <div
                key={d.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "clamp(5px, 0.69vw, 10px)",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/student/${d.id}`)}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "248.317 / 330",
                    backgroundColor: "#e6f5f9",
                    borderRadius: "clamp(9px, 1.25vw, 18px)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`/assets/students/${d.photo}`}
                    alt={d.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <p style={{ ...txt(18, 600, "black"), textAlign: "right", whiteSpace: "nowrap", paddingRight: "6px" }}>
                    {d.name}
                  </p>
                  <p style={{ ...txt(13, 400, "#b4b4b4"), textAlign: "right", whiteSpace: "nowrap", paddingRight: "6px" }}>
                    {d.track}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <footer
          className="flex items-center"
          style={{
            backgroundColor: "#34b2d5",
            height: "clamp(72px, 8.13vw, 117px)",
            padding: "0 clamp(16px, 5.56vw, 80px)",
            marginTop: "clamp(40px, 5.56vw, 80px)",
          }}
        >
          <div className="flex items-center justify-between w-full flex-wrap" style={{ gap: "clamp(8px, 1.11vw, 16px)" }}>
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>
              2026 Seoul Women&apos;s University. All rights reserved
            </p>
            <div className="flex items-center" style={{ gap: "clamp(16px, 2.22vw, 32px)" }}>
              <p className="whitespace-nowrap" style={txt(12, 600, "white")}>@swu_graduation</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

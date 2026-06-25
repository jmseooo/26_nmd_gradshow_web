"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import NavBar from "../components/NavBar";
import ScrollToTop from "../components/ScrollToTop";
import { supabase, type GuestMessage } from "@/lib/supabase";

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

function formatDate(iso: string) {
  const d = new Date(iso);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

const POINT_COLORS = ["#FFEEF0", "#EEEEFF", "#FFEACA", "#E6F6C3"];
const getCardColor = (i: number) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  // 각 행마다 포인트 컬러 열이 1개씩, 3칸씩 이동(5와 서로소라 모든 열 순환)
  return col === (row * 3) % 5 ? POINT_COLORS[row % 4] : "#e6f5f9";
};

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });
      setMessages(data ?? []);
      setLoading(false);
    };

    fetchMessages();

    // 실시간 구독: 새 메시지 자동 반영
    const channel = supabase
      .channel("guestbook-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setMessages((prev) => [payload.new as GuestMessage, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "Pretendard, sans-serif" }}
    >
      {/* ── 컨텐츠 ────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── 네비게이션 바 ──────────────────────────────── */}
        <div style={{ padding: "clamp(10px, 4.93vw, 71px) clamp(16px, 5.56vw, 80px) 0", backgroundColor: "white" }}>
          <NavBar activeItem="방명록" isLight={true} compact={true} />
        </div>

        {/* ── 본문 ──────────────────────────────────────── */}
        <div
          style={{
            padding: "clamp(32px, 4.44vw, 64px) clamp(16px, 5.56vw, 80px) clamp(40px, 5.56vw, 80px)",
            minHeight: "60vh",
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center" style={{ paddingTop: "clamp(40px, 5.56vw, 80px)" }}>
              <p style={txt(16, 400, "#9ca3af")}>불러오는 중...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center" style={{ paddingTop: "clamp(60px, 8.33vw, 120px)", gap: "clamp(8px, 1.11vw, 16px)" }}>
              <p style={txt(24, 800, "#d0eaf3")}>아직 남긴 말이 없어요</p>
              <p style={txt(14, 400, "#b0c4cc")}>거점 페이지에서 첫 번째 메시지를 남겨보세요</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "clamp(8px, 1.39vw, 20px)",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  style={{
                    backgroundColor: getCardColor(i),
                    aspectRatio: "1",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    padding: "clamp(12px, 1.67vw, 24px) clamp(15px, 2.08vw, 30px)",
                    gap: "clamp(4px, 0.56vw, 8px)",
                  }}
                >
                  <p
                    style={{
                      ...txt(14, 600, "#000000"),
                      flex: 1,
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    {msg.message}
                  </p>
                  <p style={{ ...txt(14, 600, "#808b90"), textAlign: "right", flexShrink: 0 }}>
                    {formatDate(msg.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 푸터 ───────────────────────────────────────── */}
        <footer
          className="flex items-center"
          style={{
            backgroundColor: "#34b2d5",
            height: "clamp(72px, 8.13vw, 117px)",
            padding: "0 clamp(16px, 5.56vw, 80px)",
          }}
        >
          <div className="flex items-center justify-between w-full flex-wrap" style={{ gap: "clamp(8px, 1.11vw, 16px)" }}>
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>
              2026 Seoul Women&apos;s University. All rights reserved
            </p>
            <div className="flex items-center" style={{ gap: "clamp(16px, 2.22vw, 32px)" }}>
              <p className="whitespace-nowrap" style={txt(12, 600, "white")}>@swu_graduation</p>
              <p className="whitespace-nowrap" style={txt(12, 600, "white")}>behance</p>
            </div>
          </div>
        </footer>
      </div>

      <ScrollToTop />
    </div>
  );
}

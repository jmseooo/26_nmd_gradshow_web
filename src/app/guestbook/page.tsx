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
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yy}.${mm}.${dd} ${hh}:${min}`;
}

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
      {/* ── 배경 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute w-full" style={{ top: "-278.92px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute w-full" style={{ top: "1166px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* ── 컨텐츠 ────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── 네비게이션 바 ──────────────────────────────── */}
        <div style={{ padding: "clamp(40px, 7.01vw, 101px) clamp(16px, 5.56vw, 80px) 0", backgroundColor: "white" }}>
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
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(220px, 22.22vw, 320px), 1fr))",
                gap: "clamp(12px, 1.67vw, 24px)",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "clamp(12px, 1.67vw, 24px)",
                    padding: "clamp(16px, 1.94vw, 28px)",
                    boxShadow: "0px 0px 16px 0px rgba(0, 184, 238, 0.12)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(8px, 1.11vw, 16px)",
                  }}
                >
                  <p
                    style={{
                      ...txt(18, 600, "#202024"),
                      wordBreak: "break-word",
                      flex: 1,
                    }}
                  >
                    {msg.message}
                  </p>
                  <p style={txt(12, 400, "#9ca3af", -0.01)}>
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

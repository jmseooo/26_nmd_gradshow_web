"use client";

import { useEffect, useState, useRef } from "react";
import type { CSSProperties } from "react";
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

const getCardStyle = (id: number): { bg: string } => {
  const row = Math.floor(id / 5);
  const col = id % 5;
  const p1 = (row * 3) % 5;
  const p2 = (row * 3 + 2) % 5;
  if (col === p1) return { bg: POINT_COLORS[row % 4] };
  if (col === p2) return { bg: POINT_COLORS[(row + 2) % 4] };
  return { bg: "#e6f5f9" };
};

const PAGE_SIZE = 30;

interface Props {
  initialMessages: GuestMessage[];
  initialHasMore: boolean;
  initialCursor: string | null;
}

export default function GuestbookClient({ initialMessages, initialHasMore, initialCursor }: Props) {
  const [messages, setMessages] = useState<GuestMessage[]>(initialMessages);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const channel = supabase
      .channel("guestbook-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          const newMsg = payload.new as GuestMessage;
          setMessages((prev) =>
            prev.some((m) => m.id === newMsg.id) ? prev : [newMsg, ...prev]
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.msgId!;
            if (entry.isIntersecting) next.add(id);
          });
          return next;
        });
      },
      { threshold: 0.05 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [messages]);

  const loadMore = async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .lt("created_at", cursor)
      .limit(PAGE_SIZE);
    const items = data ?? [];
    setMessages((prev) => [...prev, ...items]);
    setHasMore(items.length === PAGE_SIZE);
    if (items.length > 0) setCursor(items.at(-1)!.created_at);
    setLoadingMore(false);
  };

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("guestbook")
      .insert({ message: text })
      .select()
      .single();
    if (!error && data) {
      setMessages((prev) =>
        prev.some((m) => m.id === data.id) ? prev : [data, ...prev]
      );
    }
    setInput("");
    setSubmitting(false);
  };

  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative flex flex-col"
      style={{ fontFamily: "Pretendard, sans-serif", marginTop: "calc(-1 * var(--nav-height, 0px))", paddingTop: "var(--nav-height, 0px)" }}
    >
      <div className="relative flex flex-col flex-1" style={{ zIndex: 2 }}>
        <div
          style={{
            padding: "clamp(32px, 4.44vw, 64px) clamp(24px, 5.56vw, 80px) clamp(40px, 5.56vw, 80px)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px, 2.78vw, 40px)",
          }}
        >
          {/* ── 텍스트 필드 ──────────────────────────────── */}
          <div className="flex justify-center">
            <div
              className="flex items-center w-full"
              style={{
                maxWidth: "clamp(280px, 47.92vw, 690px)",
                height: "clamp(48px, 4.86vw, 70px)",
                backgroundColor: "white",
                border: "1px solid #202024",
                borderRadius: "100px",
                padding: "0 clamp(16px, 1.39vw, 20px)",
                gap: "clamp(8px, 0.69vw, 10px)",
                position: "relative",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                placeholder="남기고 싶은 말이 있나요?"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  ...txt(18, 600, "#000000"),
                  paddingRight: "clamp(28px, 2.22vw, 32px)",
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={submitting || !input.trim()}
                style={{
                  position: "absolute",
                  right: "clamp(14px, 1.39vw, 20px)",
                  background: "none",
                  border: "none",
                  cursor: input.trim() ? "pointer" : "default",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  opacity: input.trim() ? 1 : 0.35,
                  transition: "opacity 0.15s",
                }}
                aria-label="전송"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" fill="#202024" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── 카드 그리드 ─────────────────────────────── */}
          {!mounted ? (
            <>
              <style>{`
                @keyframes sk-shimmer {
                  0%   { background-position: -200% 0; }
                  100% { background-position:  200% 0; }
                }
                .sk-card {
                  background: linear-gradient(90deg, #e6f5f9 25%, #d0eaf3 50%, #e6f5f9 75%);
                  background-size: 200% 100%;
                  animation: sk-shimmer 1.6s ease infinite;
                }
                .sk-line {
                  background: linear-gradient(90deg, #c8e8f0 25%, #b8dce9 50%, #c8e8f0 75%);
                  background-size: 200% 100%;
                  animation: sk-shimmer 1.6s ease infinite;
                  border-radius: 4px;
                }
              `}</style>
              <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap: "clamp(8px, 1.39vw, 20px)" }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="sk-card"
                    style={{
                      aspectRatio: "1",
                      borderRadius: 0,
                      display: "flex",
                      flexDirection: "column",
                      padding: "clamp(12px, 1.67vw, 24px) clamp(15px, 2.08vw, 30px)",
                      gap: "clamp(4px, 0.56vw, 8px)",
                      animationDelay: `${i * 0.07}s`,
                    }}
                  >
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
                      <div className="sk-line" style={{ height: "14px", width: "90%", animationDelay: `${i * 0.07}s` }} />
                      <div className="sk-line" style={{ height: "14px", width: "75%", animationDelay: `${i * 0.07 + 0.1}s` }} />
                      <div className="sk-line" style={{ height: "14px", width: "60%", animationDelay: `${i * 0.07 + 0.2}s` }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div className="sk-line" style={{ height: "12px", width: "40%", animationDelay: `${i * 0.07}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center" style={{ paddingTop: "clamp(60px, 8.33vw, 120px)", gap: "clamp(8px, 1.11vw, 16px)" }}>
              <p style={txt(24, 800, "#d0eaf3")}>아직 남긴 말이 없어요</p>
              <p style={txt(14, 400, "#b0c4cc")}>첫 번째 메시지를 남겨보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap: "clamp(8px, 1.39vw, 20px)" }}>
              {messages.map((msg) => {
                const isVisible = visibleIds.has(String(msg.id));
                const cardStyle = getCardStyle(msg.id);
                return (
                  <div
                    key={msg.id}
                    data-msg-id={msg.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(String(msg.id), el);
                      else cardRefs.current.delete(String(msg.id));
                    }}
                    style={{
                      backgroundColor: cardStyle.bg,
                      aspectRatio: "1",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      padding: "clamp(12px, 1.67vw, 24px) clamp(15px, 2.08vw, 30px)",
                      gap: "clamp(4px, 0.56vw, 8px)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(32px)",
                      transition: `opacity 0.65s ease ${(msg.id % 20) * 0.05}s, transform 0.65s ease ${(msg.id % 20) * 0.05}s`,
                    }}
                  >
                    <p style={{ ...txt(14, 600, "#000000"), flex: 1, wordBreak: "break-word", overflow: "hidden" }}>
                      {msg.message}
                    </p>
                    <p style={{ ...txt(14, 600, "#808b90"), textAlign: "right", flexShrink: 0 }}>
                      {formatDate(msg.created_at)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── 더 보기 버튼 ──────────────────────────────── */}
          {hasMore && (
            <div className="flex justify-center" style={{ paddingTop: "clamp(8px, 1.39vw, 20px)" }}>
              <button
                onClick={loadMore}
                disabled={loadingMore}
                style={{
                  background: "none",
                  border: "1px solid #202024",
                  borderRadius: "100px",
                  padding: "clamp(8px, 0.83vw, 12px) clamp(24px, 2.78vw, 40px)",
                  cursor: loadingMore ? "default" : "pointer",
                  opacity: loadingMore ? 0.5 : 1,
                  transition: "opacity 0.2s",
                  ...txt(14, 600, "#202024"),
                }}
              >
                {loadingMore ? "불러오는 중..." : "더 보기"}
              </button>
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
              <a href="https://www.instagram.com/swu_nmd/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap" style={{ ...txt(12, 600, "white"), textDecoration: "none" }}>@swu_nmd</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

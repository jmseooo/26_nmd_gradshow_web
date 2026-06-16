"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

const STYLE_ID = "scroll-reveal-keyframes";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

export default function ScrollReveal({ children, className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement("style");
      s.id = STYLE_ID;
      s.textContent = `
        @keyframes scroll-reveal {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scroll-reveal-run {
          animation: scroll-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `;
      document.head.appendChild(s);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 강제 리플로우로 이미 클래스가 있어도 애니메이션 재실행
          el.classList.remove("scroll-reveal-run");
          void el.offsetWidth;
          el.style.opacity = "0";
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("scroll-reveal-run");
        } else {
          el.classList.remove("scroll-reveal-run");
          el.style.opacity = "0";
          el.style.animationDelay = "";
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, ...style }}
    >
      {children}
    </div>
  );
}

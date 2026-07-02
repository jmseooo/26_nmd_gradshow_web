import type { Metadata } from "next";
import "./globals.css";
import PageTransitionWrapper from "./components/PageTransitionWrapper";
import PersistentNav from "./components/PersistentNav";
import MobileNav from "./components/MobileNav";
import ScrollToTop from "./components/ScrollToTop";
import { HeroLightProvider } from "./components/HeroLightContext";

export const metadata: Metadata = {
  title: "우리의 거점 — 서울여자대학교 첨단미디어디자인전공 제2회 졸업전시",
  description: "서울여자대학교 첨단미디어디자인전공 제2회 졸업전시",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased">
      <head>
        <link rel="preload" href="/fonts/PretendardVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* 히어로 다크 배경 — 첫 로드 시 즉시 필요 */}
        <link rel="preload" href="/assets/hero-bg1.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/hero-bg3.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/hero-vector.svg" as="image" type="image/svg+xml" />
      </head>
      <body className="min-h-full">
        <HeroLightProvider>
          <div className="desktop-nav"><PersistentNav /></div>
          <div className="mobile-nav"><MobileNav /></div>
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
          <ScrollToTop />
        </HeroLightProvider>
      </body>
    </html>
  );
}

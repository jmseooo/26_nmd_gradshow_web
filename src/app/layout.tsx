import type { Metadata } from "next";
import "./globals.css";
import PageTransitionWrapper from "./components/PageTransitionWrapper";

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </body>
    </html>
  );
}

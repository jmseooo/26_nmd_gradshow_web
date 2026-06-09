"use client";

export default function ScrollToTop() {
  return (
    <button
      className="fixed bottom-6 right-6 flex items-center justify-center rounded-full shadow-lg z-50"
      style={{
        backgroundColor: "#00b8ee",
        width: "48px",
        height: "48px",
        padding: "12px",
      }}
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <img
        alt=""
        className="w-full h-full"
        style={{ transform: "rotate(-90deg)" }}
        src="/assets/arrow-forward.svg"
      />
    </button>
  );
}

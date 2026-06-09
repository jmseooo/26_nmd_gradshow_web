export default function TokensPage() {
  return (
    <main className="min-h-screen p-10 font-clairsans" style={{ background: "var(--color-surface)" }}>
      <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>
        Design System
      </h1>
      <p className="text-sm mb-12" style={{ color: "var(--color-text-body)" }}>
        Seoul Women&apos;s University · NMD Web
      </p>

      {/* ── Main Color ────────────────────────────────────────── */}
      <section className="mb-14">
        <SectionTitle>Main Color</SectionTitle>

        <div className="flex gap-3 flex-wrap">
          {MAIN_COLORS.map(({ token, hex, label, light }) => (
            <div key={token} className="flex flex-col w-32">
              <div
                className="w-full h-24 rounded-lg mb-2 border border-black/5"
                style={{ background: hex }}
              />
              <span className="text-xs font-medium" style={{ color: light ? "#151515" : "#fefefe", display: "none" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>{label ?? token}</span>
              <span className="text-xs font-mono mt-0.5" style={{ color: "var(--color-text-body)" }}>{hex}</span>
              <span className="text-2xs mt-0.5" style={{ color: "var(--color-text-body)" }}>{token}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Track / Point Color ───────────────────────────────── */}
      <section className="mb-14">
        <SectionTitle>Track Color</SectionTitle>
        <p className="text-sm mb-5" style={{ color: "var(--color-text-body)" }}>
          4개 전공 트랙을 상징하는 포인트 컬러
        </p>

        <div className="flex gap-4 flex-wrap">
          {TRACK_COLORS.map(({ track, hex, keyword, desc }) => (
            <div key={track} className="flex flex-col w-52">
              <div
                className="w-full h-32 rounded-xl mb-3"
                style={{ background: hex }}
              />
              <span className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{track}</span>
              <span className="text-xs font-mono mt-1" style={{ color: "var(--color-text-body)" }}>{hex}</span>
              <span className="text-xs font-medium mt-2" style={{ color: "var(--color-text-primary)" }}>{keyword}</span>
              <span className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-text-body)" }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Base / Neutral ────────────────────────────────────── */}
      <section className="mb-14">
        <SectionTitle>Base</SectionTitle>
        <div className="flex gap-3 flex-wrap">
          {BASE_COLORS.map(({ token, hex }) => (
            <div key={token} className="flex flex-col w-32">
              <div
                className="w-full h-16 rounded-lg mb-2 border border-black/10"
                style={{ background: hex }}
              />
              <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>{token}</span>
              <span className="text-xs font-mono mt-0.5" style={{ color: "var(--color-text-body)" }}>{hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ────────────────────────────────────────── */}
      <section className="mb-14">
        <SectionTitle>Typography</SectionTitle>

        {/* Font Families */}
        <div className="mb-10">
          <Label>Font Families</Label>
          <div className="space-y-6 mt-4">
            <div>
              <span className="text-xs mb-2 block" style={{ color: "var(--color-text-body)" }}>
                Sandoll ClairSans — Main · 클레어산스
              </span>
              <div className="space-y-1">
                {[
                  { weight: 400, label: "04 Rg · Regular" },
                  { weight: 500, label: "05 Md · Medium" },
                  { weight: 600, label: "06 Sb · SemiBold" },
                ].map(({ weight, label }) => (
                  <div key={weight} className="flex items-baseline gap-4">
                    <span className="w-36 text-xs shrink-0" style={{ color: "var(--color-text-body)", fontWeight: weight }}>
                      {label}
                    </span>
                    <span className="font-clairsans text-2xl" style={{ fontWeight: weight, color: "var(--color-text-primary)" }}>
                      Seoul Women&apos;s University NMD
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs mb-2 block" style={{ color: "var(--color-text-body)" }}>
                Sandoll GyeokdongG2 — Sub · 격동고딕
              </span>
              <div className="flex items-baseline gap-4">
                <span className="w-36 text-xs shrink-0" style={{ color: "var(--color-text-body)" }}>
                  04 Rg · Regular
                </span>
                <span className="font-gyeokdong text-2xl" style={{ color: "var(--color-text-primary)" }}>
                  서울여자대학교 첨단미디어디자인전공
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Font Sizes */}
        <div>
          <Label>Font Sizes</Label>
          <div className="space-y-3 mt-4">
            {FONT_SIZES.map(({ cls, label, px }) => (
              <div key={cls} className="flex items-baseline gap-4">
                <span className="w-36 text-xs shrink-0" style={{ color: "var(--color-text-body)" }}>
                  {label} / {px}
                </span>
                <span className={`${cls} leading-none`} style={{ color: "var(--color-text-primary)" }}>
                  NMD 신진작가전
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Border Radius ─────────────────────────────────────── */}
      <section className="mb-14">
        <SectionTitle>Border Radius</SectionTitle>
        <div className="flex gap-6 flex-wrap mt-4">
          {RADII.map(({ label, cls, px }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className={`w-20 h-20 ${cls}`}
                style={{ background: "var(--color-brand-500)" }}
              />
              <span className="text-xs text-center" style={{ color: "var(--color-text-body)" }}>
                {label}<br />{px}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const MAIN_COLORS = [
  { token: "brand-100", hex: "#7ec5cb", light: true },
  { token: "brand-200", hex: "#82c9dd", light: true },
  { token: "brand-500", hex: "#0fa7d2", label: "brand-500 (primary)" },
  { token: "brand-600", hex: "#0097cf" },
  { token: "brand-700", hex: "#2174a4" },
  { token: "white",     hex: "#fefefe", light: true },
  { token: "surface",   hex: "#fafaf8", light: true },
];

const TRACK_COLORS = [
  { track: "XR",     hex: "#9ccc4e", keyword: "확장·미지의 영역", desc: "생동감 있는 그린으로 현실과 가상의 경계를 넘나드는 XR의 확장성을 표현" },
  { track: "MOTION", hex: "#f6c160", keyword: "에너지·흐름·시간", desc: "움직임과 변화를 직관적으로 연상시키며 모션의 역동성을 상징" },
  { track: "UI",     hex: "#f8b1b2", keyword: "명료함·구조·표현", desc: "핑크는 UI의 직접적이고 선명한 커뮤니케이션과 시각적 임팩트를 상징" },
  { track: "UX",     hex: "#9ea8d5", keyword: "공감·인간 중심", desc: "차분한 블루퍼플로 창의성과 감성적 사고, UX의 섬세함을 반영" },
];

const BASE_COLORS = [
  { token: "text-primary", hex: "#151515" },
  { token: "text-body",    hex: "#313131" },
  { token: "black",        hex: "#000000" },
  { token: "white",        hex: "#fefefe" },
  { token: "surface",      hex: "#fafaf8" },
];

const FONT_SIZES = [
  { cls: "text-2xs",  label: "text-2xs",  px: "5px" },
  { cls: "text-xs",   label: "text-xs",   px: "9px" },
  { cls: "text-sm",   label: "text-sm",   px: "12px" },
  { cls: "text-base", label: "text-base", px: "18px" },
  { cls: "text-lg",   label: "text-lg",   px: "21px" },
  { cls: "text-xl",   label: "text-xl",   px: "24px" },
  { cls: "text-2xl",  label: "text-2xl",  px: "38px" },
  { cls: "text-3xl",  label: "text-3xl",  px: "40px" },
  { cls: "text-4xl",  label: "text-4xl",  px: "56px" },
  { cls: "text-5xl",  label: "text-5xl",  px: "60px" },
  { cls: "text-6xl",  label: "text-6xl",  px: "90px" },
];

const RADII = [
  { label: "radius-xs",  cls: "rounded-xs",  px: "2px" },
  { label: "radius-sm",  cls: "rounded-sm",  px: "4px" },
  { label: "radius-md",  cls: "rounded-md",  px: "7px" },
  { label: "radius-lg",  cls: "rounded-lg",  px: "14px" },
  { label: "radius-xl",  cls: "rounded-xl",  px: "18px" },
  { label: "radius-2xl", cls: "rounded-2xl", px: "24px" },
  { label: "radius-3xl", cls: "rounded-3xl", px: "90px" },
  { label: "radius-4xl", cls: "rounded-4xl", px: "100px" },
  { label: "radius-5xl", cls: "rounded-5xl", px: "180px" },
];

/* ── Helper Components ──────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-semibold mb-5 pb-2"
      style={{ color: "var(--color-text-primary)", borderBottom: "1px solid #e0e0e0" }}
    >
      {children}
    </h2>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-body)" }}>
      {children}
    </p>
  );
}

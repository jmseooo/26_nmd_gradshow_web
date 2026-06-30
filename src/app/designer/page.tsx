"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";

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

const designers = [
  { id: 1,  name: "김도연 22",      photo: "photo-13.png", track: "UX / MO"  },
  { id: 2,  name: "김도연 23",      photo: "photo-16.png", track: "XR / UX"  },
  { id: 3,  name: "김수민",          photo: "photo-18.png", track: "XR / UX"  },
  { id: 4,  name: "김지아",          photo: "photo-10.png", track: "UX / MO"  },
  { id: 5,  name: "김지유",          photo: "photo-14.png", track: "UX / UI"  },
  { id: 6,  name: "김채현",          photo: "photo-20.png", track: "XR / MO"  },
  { id: 7,  name: "김태린",          photo: "photo-1.png",  track: "UX / UI"  },
  { id: 8,  name: "박서영",          photo: "photo-3.png",  track: "XR / MO"  },
  { id: 9,  name: "박서하",          photo: "photo-4.png",  track: "UX / MO"  },
  { id: 10, name: "박소정",          photo: "photo-3.png",  track: "XR / MO"  },
  { id: 11, name: "박채원",          photo: "photo-9.png",  track: "UX"       },
  { id: 12, name: "서유정",          photo: "photo-11.png", track: "XR / UX"  },
  { id: 13, name: "서한이",          photo: "photo.png",    track: "UX / UI"  },
  { id: 14, name: "신민지",          photo: "photo-15.png", track: "MO"       },
  { id: 15, name: "오연서",          photo: "photo-3.png",  track: "UI / MO"  },
  { id: 16, name: "윤내경",          photo: "photo-12.png", track: "UX / MO"  },
  { id: 17, name: "응웬짠휘엔아잉",  photo: "photo-3.png",  track: "UX / MO"  },
  { id: 18, name: "이유진",          photo: "photo-3.png",  track: "XR / MO"  },
  { id: 19, name: "전지민",          photo: "photo-6.png",  track: "XR / UX"  },
  { id: 20, name: "정가람",          photo: "photo-3.png",  track: "MO"       },
  { id: 21, name: "정윤서",          photo: "photo-3.png",  track: "XR / MO"  },
  { id: 22, name: "정지연",          photo: "photo-17.png", track: "XR"       },
  { id: 23, name: "조연진",          photo: "photo-5.png",  track: "XR / MO"  },
  { id: 24, name: "진민서",          photo: "photo-8.png",  track: "UX / UI"  },
  { id: 25, name: "천세진",          photo: "photo-19.png", track: "UX / MO"  },
  { id: 26, name: "현명화",          photo: "photo-2.png",  track: "UX / MO"  },
  { id: 27, name: "황태희",          photo: "photo-7.png",  track: "XR / MO"  },
  { id: 28, name: "황희주",          photo: "photo-3.png",  track: "MO"       },
];

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
        <div style={{ padding: "clamp(24px, 5.56vw, 80px) clamp(16px, 12.36vw, 178px) 0" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              columnGap: "clamp(15px, 2.08vw, 30px)",
              rowGap: "clamp(10px, 1.39vw, 20px)",
            }}
          >
            {designers.map((d) => (
              <div
                key={d.id}
                style={{
                  width: "calc((100% - 3 * clamp(15px, 2.08vw, 30px)) / 4)",
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
              <p className="whitespace-nowrap" style={txt(12, 600, "white")}>behance</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

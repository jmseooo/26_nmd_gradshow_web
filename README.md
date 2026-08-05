<div align="center">

<img src="src/app/opengraph-image.png" width="600" alt="우리의 거점">

# 우리의 거점

서울여자대학교 첨단미디어디자인전공 **제2회 졸업전시** 웹사이트

[**🔗 swunmd2026.com**](https://swunmd2026.com)

</div>

---

## 소개

25명의 졸업생과 28개의 졸업 작품을 아카이빙하는 전시 웹사이트입니다.
전시 주제인 *'거점'* 을 인터랙티브 네트워크 그래프로 시각화하고, 작품 · 디자이너 · 방명록을 하나의 흐름으로 연결했습니다.

Figma 시안을 직접 그리고 그대로 코드로 옮겼습니다.

## 화면

| 화면 | 설명 |
| --- | --- |
| [홈](https://swunmd2026.com) | 네트워크 그래프 히어로 · 전시 소개 · 카테고리 슬라이더 |
| [작품](https://swunmd2026.com/works) | 작품 28개 갤러리 (XR 10 · MOTION 10 · UX 5 · UI 3) |
| [디자이너](https://swunmd2026.com/designer) | 참여 디자이너 25명 목록 |
| [디자이너 상세](https://swunmd2026.com/student/1) | 개인 페이지 (작품 · 연락처) |
| [방명록](https://swunmd2026.com/guestbook) | Supabase 연동, 실시간 반영 |

## 이런 걸 만들었어요

- **네트워크 그래프** — 외부 라이브러리 없이 Canvas 2D API로 직접 구현. 드래그 회전, 원점 복귀, 다크모드 대응 (`src/lib/network-graph.ts`, 의존성 0개)
- **페이지 전환 애니메이션** — 라우트 이동 시 네비게이션은 유지하고 콘텐츠만 전환
- **반응형 타이포그래피** — Figma의 1440px 기준 폰트 크기를 `clamp()` 기반 유틸로 변환해 모바일까지 비율 유지
- **디자인 토큰** — 컬러 · 타이포를 CSS 변수로 정의하고 내부 참고용 페이지에 문서화
- **방명록** — Supabase 기반 SSR + 스켈레톤 로딩

## 기술 스택

| | |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router) · React 19 |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 · CSS Variables |
| 데이터 | Supabase |
| 폰트 | Pretendard Variable |
| 배포 | Vercel |

## 로컬 실행

```bash
npm install
npm run dev
```

루트에 `.env.local` 파일을 만들고 아래 값을 채워주세요. (방명록 페이지에만 필요합니다)

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 구조

```
src/
├── app/
│   ├── components/      # 네비게이션, 페이지 전환, 스크롤 인터랙션 등
│   ├── field/           # 전시 현장 기록 (준비 중, 비공개)
│   ├── works/           # 작품 갤러리
│   ├── designer/        # 디자이너 목록
│   ├── student/[id]/    # 디자이너 상세
│   ├── guestbook/       # 방명록
│   └── tokens/          # 디자인 토큰 문서 (내부 참고용, 비공개)
└── lib/
    ├── works-data.ts    # 작품 데이터
    ├── designers.ts     # 디자이너 데이터
    ├── network-graph.ts # 그래프 렌더링 엔진
    └── supabase.ts      # Supabase 클라이언트
```

작품과 디자이너 정보는 CMS 없이 `src/lib`의 데이터 파일에서 관리합니다.

export type Work = {
  id: number;
  name: string;
  members: string[];
  category: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  images?: string[];
};

export const works: Work[] = [
  // ── UI ──────────────────────────────────────────────────────────────────
  {
    id: 1, name: "ANYWAY", members: ["김지유", "서한이"], category: "UI",
    description: "'ANYWAY'는 미완성을 기록하는 서비스로, 목표 달성 여부보다 '그래도 뭔가를 했다'라는 사실에 집중한다. 완성이라는 완벽한 결과를 추구하는 사회에서 미완성, 실패도 결과를 향해가는 하나의 서사라는 사실이 잊힌다. 'ANYWAY'는 이 문제를 꼬집어 AI를 통해 유쾌한 실패를 이야기한다. 오늘의 목표와 달성도를 입력하면 LLM AI를 통해 그래도 해낸 것을 문장으로 출력할 수 있다. 이 문구는 공유할 수 있으며, 서로의 실패를 유쾌하게 바라보고 연대하며 응원할 수 있는 장치가 된다.",
    thumbnail: "/assets/works/ui/UI_ANYWAY_00.jpg",
    images: ["/assets/works/ui/UI_ANYWAY_01.jpg","/assets/works/ui/UI_ANYWAY_02.jpg","/assets/works/ui/UI_ANYWAY_03.jpg","/assets/works/ui/UI_ANYWAY_04.jpg","/assets/works/ui/UI_ANYWAY_05.jpg","/assets/works/ui/UI_ANYWAY_06.jpg","/assets/works/ui/UI_ANYWAY_07.jpg","/assets/works/ui/UI_ANYWAY_08.jpg"],
  },
  {
    id: 2, name: "Steps", members: ["김태린"], category: "UI",
    description: "Steps는 공간을 기억하는 새로운 방식을 제공한다. 하나의 공간은 한 사람에 의해 하나의 시선으로 기록되고 기억된다. 그리고 이러한 공간의 기록은 누군가에게 전달되어 또 다른 시선들이 더해지고, 여러 관점이 담긴 입체적인 기억으로 확장된다. 이로써 우리는 하나의 공간을 다른 시간, 같은 곳에서 기억하게 되며, 그 공간의 기억들은 또 다른 발걸음(Steps)으로 연결된다.",
    thumbnail: "/assets/works/ui/UI_Steps_00.jpg",
    images: ["/assets/works/ui/UI_Steps_01.jpg"],
  },
  {
    id: 3, name: "Suners", members: ["진민서"], category: "UI",
    description: "단순한 알람 소리가 아닌, 일출과 함께 하루를 시작하다. Suners는 현지 일출 시간에 맞춰 사용자를 깨워줌으로써 자연스러운 생체 리듬에 맞는 아침을 맞이할 수 있도록 돕는다. 날씨에 대응해 생성되는 실시간 컬러 그래픽을 통해 감각적으로 시간, 날씨를 알 수 있다. 기상 후 할 일 목록을 확인하고, 간단한 핀치 동작으로 알람을 조절하는 것은 물론 기상 습관까지 기록할 수 있다. 전 세계 앱스토어에서 설치할 수 있다.",
    url: "https://apps.apple.com/kr/app/suners-sunrise-alarm-app/id6779686985",
    thumbnail: "/assets/works/ui/UI_Suners_.jpg",
    images: [],
  },

  // ── UX ──────────────────────────────────────────────────────────────────
  {
    id: 14, name: "RENO", members: ["김도연 22", "박서하", "천세진", "현명화"], category: "UX",
    description: "RENO는 스마트 글래스 기반의 XR 러닝 어시스턴트이다. 시선 이탈 없이 사용자의 러닝 타입·목표·상태에 맞춘 피드백을 제공한다. 러닝 전 목표 설정부터 실시간 가이드, 러닝 후 성장 리포트까지 연결하여 지속적인 성장을 돕는 새로운 러닝 경험을 제안한다.",
    thumbnail: "/assets/works/ux/UX_RENO_00.jpg",
    images: [],
  },
  {
    id: 15, name: "NURO", members: ["김도연 23", "윤내경"], category: "UX",
    description: "NURO는 AI 피부 분석과 성분 정보를 기반으로 사용자에게 최적화된 스킨케어 루틴을 제안한다. 사용자는 현재 피부 상태를 확인하고, 흩어진 성분 정보를 자신의 피부와 연결해 이해하며 지금 필요한 성분과 제품을 쉽게 파악할 수 있다. 또한 매일의 루틴과 피부 변화를 기록하고 비교하며 관리 과정을 이어갈 수 있다. 이를 통해 사용자가 자신의 피부를 올바르게 이해하고, 스스로 관리하는 습관을 형성할 수 있는 새로운 스킨케어 경험을 제공한다.",
    url: "https://nuro-project.vercel.app/",
    thumbnail: "/assets/works/ux/UX_NURO_00.jpg",
    images: [],
  },
  {
    id: 26, name: "BIMO", members: ["김수민", "박채원", "서유정", "전지민"], category: "UX",
    description: "BIMO는 AI와 함께 상상을 이어가는 인터랙티브 동화책 서비스이다. 아이의 그림이 캐릭터가 되고, 아이의 말과 선택이 이야기의 흐름에 반영되어 자신만의 동화를 만들어 나간다. AI는 결과물을 대신 만들어 주는 존재가 아니라 질문과 제안을 통해 창작을 함께 이어 가는 협력자로 작동하며, 아이가 창작의 주도권을 유지하도록 돕는다. 아이의 창작이 한 번의 결과물로 끝나지 않고 지속적으로 이어질 수 있도록 설계했으며, 캐릭터와 이야기가 쌓여 아이만의 세계를 만들어 가는 경험을 제공한다.",
    thumbnail: "/assets/works/ux/UX_BIMO_00.jpg",
    images: ["/assets/works/ux/UX_BIMO_01.jpg","/assets/works/ux/UX_BIMO_02.jpg","/assets/works/ux/UX_BIMO_03.jpg","/assets/works/ux/UX_BIMO_04.jpg","/assets/works/ux/UX_BIMO_05.jpg","/assets/works/ux/UX_BIMO_06.jpg","/assets/works/ux/UX_BIMO_07.jpg"],
  },
  {
    id: 27, name: "닿음", members: ["김지아", "김지유", "서한이"], category: "UX",
    description: "'닿음'은 데스플래닝과 추모를 결합한 추모 서비스다. 데스플래닝 과정에서 유저는 자신을 기록하거나 좋아하는 노래를 모아 플레이리스트를 남길 수 있다. 또한 사후에도 타인이 자신과 대화할 수 있도록 자신의 말투, 생각을 학습한 AI를 생성할 수 있다. 이와 같이 '닿음'은 개인의 기록을 서로 간의 닿음으로 이어주어 사후 관계가 입체적으로 이어지기 어렵다는 기존 문제를 탈피한다. 나아가 단방향적 추모 구조에서 벗어나 고인과 연결되는 새로운 추모 문화를 선도하고자 한다.",
    thumbnail: "/assets/works/ux/UX_닿음_00.jpg",
    images: ["/assets/works/ux/UX_닿음_01.jpg","/assets/works/ux/UX_닿음_02.jpg","/assets/works/ux/UX_닿음_03.jpg","/assets/works/ux/UX_닿음_04.jpg","/assets/works/ux/UX_닿음_05.jpg","/assets/works/ux/UX_닿음_06.jpg","/assets/works/ux/UX_닿음_07.jpg","/assets/works/ux/UX_닿음_08.jpg"],
  },
  {
    id: 28, name: "COCO", members: ["김태린", "진민서"], category: "UX",
    description: "COCO는 초등 교사를 위한 AI 기반 행동발달 및 종합의견 생성 웹앱 서비스이다. 초등 교사가 학생의 일상적인 모습과 성장 과정을 꾸준히 기록하면, AI가 쌓인 기록과 상황을 바탕으로 자연스럽고 신뢰도 높은 서술식 평가 문장을 생성한다. 단순히 평가 문장을 대신 작성하는 것을 넘어 학생 한 명 한 명의 성장과 가능성을 충분히 담아낼 수 있도록 돕는다. 이를 통해 교사는 학기말 반복되는 평가 작성 부담을 줄이고, 문장 작성보다 학생을 깊이 관찰하고 올바르게 평가하는 본질적인 역할에 더욱 집중할 수 있다.",
    url: "https://elementary-two.vercel.app/app",
    thumbnail: "/assets/works/ux/UX_COCO_00.png",
    images: ["/assets/works/ux/UX_COCO_01.png","/assets/works/ux/UX_COCO_02.png","/assets/works/ux/UX_COCO_03.png","/assets/works/ux/UX_COCO_04.png","/assets/works/ux/UX_COCO_05.png","/assets/works/ux/UX_COCO_06.png","/assets/works/ux/UX_COCO_07.png","/assets/works/ux/UX_COCO_08.png","/assets/works/ux/UX_COCO_09.png","/assets/works/ux/UX_COCO_10.png"],
  },

  // ── XR ──────────────────────────────────────────────────────────────────
  {
    id: 4, name: "십이동행, 열두 개의 마음", members: ["김도연 23", "김수민", "서유정"], category: "XR",
    description: "고민을 감정의 씨앗으로 시각화하고, 십이지신의 수호 아래 변화시키는 XR 감정 치유 콘텐츠이다. 사용자는 고민의 성격에 따라 열두 수호신 중 하나와 연결되며, VR 공간에서 씨앗을 돌보고 감정이 변화하는 과정을 체험한다. 이를 통해 말로 표현하기 어려운 고민을 시각적 경험으로 전환하고, 전통적 상징과 몰입형 기술을 결합한 새로운 감정 치유 방식을 제안한다.",
    thumbnail: "/assets/works/xr/XR_십이지신_00.jpg",
    images: ["/assets/works/xr/XR_십이지신_01.png","/assets/works/xr/XR_십이지신_02.png","/assets/works/xr/XR_십이지신_03.png","/assets/works/xr/XR_십이지신_04.jpg","/assets/works/xr/XR_십이지신_05.png","/assets/works/xr/XR_십이지신_06.png","/assets/works/xr/XR_십이지신_07.png","/assets/works/xr/XR_십이지신_08.png"],
  },
  {
    id: 5, name: "Bloop!", members: ["김채현"], category: "XR",
    description: "Bloop!은 아이들의 목욕 시간을 가장 즐거운 놀이로 바꾸는 XR 배스 브랜드이다. 잔소리나 강요 대신 자율적인 인터랙션을 통해 아이 스스로 욕실을 찾고 씻는 습관을 기를 수 있도록 돕는다. 칫솔질 동작에 반응하는 비눗방울 인터랙션과 피버 타임, 보상 시스템을 통해 XR 거울 속 가상 공간에서 캐릭터와 함께 즐겁게 양치할 수 있다. 이를 통해 아이에게 피하고 싶었던 씻는 시간을 즐거운 놀이 경험으로 전환하고, 스스로 씻는 습관을 자연스럽게 형성하도록 돕는다.",
    thumbnail: "/assets/works/xr/XR_Bloop!_00.jpg",
    images: ["/assets/works/xr/XR_Bloop!_01.jpg","/assets/works/xr/XR_Bloop!_02.jpg","/assets/works/xr/XR_Bloop!_03.jpg","/assets/works/xr/XR_Bloop!_04.jpg"],
  },
  {
    id: 6, name: "디지털 갠지스", members: ["박서영"], category: "XR",
    description: "디지털 갠지스는 가상 강물에 등불을 띄우며 소원을 비는 VR 인터랙티브 프로젝트이다. 사용자는 몰입형 공간에서 등불을 띄우며 자신의 바람을 되새기고, 웹사이트에서는 사랑·우정·학업·건강 중 하나의 테마를 선택해 소원이나 목표를 기록할 수 있다. 작성한 내용은 1년 후 이메일로 전달되어 과거의 다짐을 돌아보고 자신의 변화와 성장을 회고하는 경험으로 이어진다.",
    thumbnail: "/assets/works/xr/XR_디지털_갠지스_00.jpg",
    images: ["/assets/works/xr/XR_디지털_갠지스_01.jpg","/assets/works/xr/XR_디지털_갠지스_02.jpg","/assets/works/xr/XR_디지털_갠지스_03.jpg","/assets/works/xr/XR_디지털_갠지스_04.jpg","/assets/works/xr/XR_디지털_갠지스_05.jpg"],
  },
  {
    id: 7, name: "noon", members: ["박소정"], category: "XR",
    description: "noon은 같은 감정도 사람마다 다르게 경험될 수 있다는 점을 디저트로 시각화한 디저트 카페이다. 하나의 과일이 다양한 디저트로 완성되는 것처럼, 같은 감정도 사람마다 다양한 모습으로 나타날 수 있다는 의미를 담아 시각적으로 전달하고자 하였다.",
    thumbnail: "/assets/works/xr/XR_noon_박소정.jpg",
    images: [],
  },
  {
    id: 8, name: "도달점", members: ["이유진"], category: "XR",
    description: "기록이란 단순히 무언가를 남기는 행위가 아니라, 모든 것은 소멸하고 잊힌다는 진리에 저항하고자 한 인간의 가장 오래된 몸짓이다. 외로움이 만들어 낸, 시간을 망라하는 연결점인 셈이다. 프로젝트 <도달점>은 닿지 않을 걸 알면서도 남기기로 한 인류 최후의 흔적, 골든 레코드를 소재로 기록에 관해 이야기한다. 금제 음반에 담긴 여러 언어의 인사말과 음악을 인터랙션을 통해 해독하며, 이 기록이 마침내 도달할 곳을 경험하게 한다.",
    thumbnail: "/assets/works/xr/XR_도달점_00.jpg",
    images: [],
  },
  {
    id: 9, name: "Onstage", members: ["전지민"], category: "XR",
    description: "온스테이지는 XR 기반 발표 연습 플랫폼이다. 실제 발표 전 긴장감을 미리 경험하고, 무대 위 자신의 상태를 객관적으로 인지할 수 있도록 돕는다. 사용자는 청중이 있는 가상 강당에 올라 실전과 같은 환경에서 발표를 리허설하며, 말 속도·시선·호흡 데이터를 실시간 HUD로 확인할 수 있다. 발표 캘린더와 자료 업로드 기능으로 일정부터 PDF·대본까지 한곳에서 체계적으로 관리하고, 발표 후에는 녹화 영상과 활동 데이터를 분석해 나만의 발표 유형을 발견한다. 끝난 무대가 다음 무대를 만든다.",
    thumbnail: "/assets/works/xr/xr_온스테이지_00.jpg",
    images: [],
  },
  {
    id: 10, name: "Roam in Ceram", members: ["정윤서"], category: "XR",
    description: "도자기 세계관을 배경으로 한 몰입형 XR 인터랙티브 콘텐츠이다. 관람객은 도자기의 아름다운 질감과 디지털 판타지가 융합된 미지의 공간 속에서 세계를 깨우는 여정의 주인공이 된다. 가상의 도자기 구슬은 현실의 감각을 자극하며 게임과 현실의 경계를 허무는 열쇠가 된다. 신비로운 구슬을 매개로 가상 세계와 상호작용하며, 관람객은 단순한 플레이어를 넘어 세계의 일부로 거듭난다.",
    thumbnail: "/assets/card_web.png",
  },
  {
    id: 11, name: "KEMIDEA", members: ["정지연"], category: "XR",
    description: "KEMIDEA는 개미와 이데아의 합성어로, 세상의 일부로서 스스로를 온전히 알지 못한 채 살아가는 인간을 개미에 비유한 인터랙션 작품이다. 관객이 손을 움직이면 화면에 흔적이 누적되고, 눈을 깜빡이면 파동이 번지며, 동시에 베일이 서서히 상승해 제3의 눈이 관객을 응시한다. 의식적 행위가 무의식적으로 또 다른 신호로 번역되는 순간, 관객은 관찰자에서 관찰되는 존재로 전환되는 감각을 옷과 패턴이라는 매개체를 통해 체험한다.",
    thumbnail: "/assets/works/xr/XR_KEMIDEA_00.png",
    images: [],
  },
  {
    id: 12, name: "FLAMKA INTERCALARIS", members: ["조연진"], category: "XR",
    description: "버려진 호텔 내부를 탐험하는 1인칭 워킹 시뮬레이터이다. 독특한 색채와 외롭고 낯선 공간이 위화감을 자아내며 사용자마다 각기 다른 경험을 선사한다.",
    thumbnail: "/assets/works/xr/XR_FALMKA_INTERCALARIS_00.jpg",
    images: [],
  },
  {
    id: 13, name: "ECHO", members: ["황태희"], category: "XR",
    description: "인류가 사라진 세계관 기반의 3D 어드벤처 게임. 작은 로봇 에코는 동료를 깨우기 위한 여정에서 탐험과 선택을 통해 진실을 마주한다. 플레이어는 두 가지 결말을 경험할 수 있다.",
    thumbnail: "/assets/card_web.png",
  },

  // ── MOTION ──────────────────────────────────────────────────────────────
  {
    id: 16, name: "Onit", members: ["김도연 22", "현명화"], category: "MOTION",
    description: "Onit은 음악을 들으며 느낀 감정과 순간을 AI 기반의 앨범 아트워크로 시각화하는 플랫폼이다. 사용자는 음악과 함께한 기억을 자신만의 비주얼로 기록하고, 하나의 작품처럼 보관하며 감정을 새로운 형태로 경험할 수 있다. 브랜드 필름은 일상의 순간들이 음악을 통해 하나의 아트워크로 완성되는 여정을 담아낸다.",
    thumbnail: "/assets/works/mo/MO_Onit_00.jpg",
    images: [],
  },
  {
    id: 17, name: "얻", members: ["김지아", "김채현", "윤내경"], category: "MOTION",
    description: "[얻]은 은퇴한 시니어의 숙련된 기술과 삶의 지혜를 다양한 경험 콘텐츠로 재해석하여 청년세대와 연결하는 시니어 콘텐츠 에이전시이다. 오랜 시간 축적된 노하우를 다양한 형태의 콘텐츠로 기획·제작하며, 세대 간의 자연스러운 교류를 만들어간다. 이를 통해 시니어는 자신의 경험에 가치를 더하고, 청년은 새로운 기술과 이야기를 경험한다. 브랜드 필름에는 두 세대가 이러한 경험 속에서 조화를 이루며 새로운 문화적 가치를 [얻]는 모습을 담았다.",
    thumbnail: "/assets/works/mo/MO_얻_00.jpg",
    images: ["/assets/works/mo/MO_얻_01.jpg","/assets/works/mo/MO_얻_02.jpg","/assets/works/mo/MO_얻_03.jpg","/assets/works/mo/MO_얻_04.jpg","/assets/works/mo/MO_얻_05.jpg","/assets/works/mo/MO_얻_06.jpg","/assets/works/mo/MO_얻_07.jpg","/assets/works/mo/MO_얻_08.jpg","/assets/works/mo/MO_얻_09.jpg"],
  },
  {
    id: 18, name: "Pieces Into One", members: ["박서영"], category: "MOTION",
    description: "Pieces Into One은 현대 청년의 불안과 경험을 흩어진 파편에 비유하고, 그 파편들이 하나의 정교한 만다라로 완성되는 과정을 담은 모션그래픽 영상이다. 만다라의 생성 원리를 통해 파편화된 조각들이 질서를 찾아가는 모습을 시각화하며 불안과 방황 또한 자신을 완성해 가는 과정임을 이야기한다. 작품은 모든 경험이 결국 현재의 자신을 이루는 과정이라는 메시지를 전달한다.",
    thumbnail: "/assets/works/mo/MO_Pieces_Into_One_00.jpg",
    images: ["/assets/works/mo/MO_Pieces_Into_One_01.jpg","/assets/works/mo/MO_Pieces_Into_One_02.jpg","/assets/works/mo/MO_Pieces_Into_One_03.jpg","/assets/works/mo/MO_Pieces_Into_One_04.jpg","/assets/works/mo/MO_Pieces_Into_One_05.jpg","/assets/works/mo/MO_Pieces_Into_One_06.jpg"],
  },
  {
    id: 19, name: "S.R.A", members: ["박서하", "천세진"], category: "MOTION",
    description: "Scroll, Repeat, Arrive는 숏폼 플랫폼의 구조를 버튼 없는 엘리베이터에 은유한 작품이다. 관성적인 시청을 은유적으로 표현함으로써 보는 사람이 스스로 자신의 행동을 낯설게 바라보는 순간을 만들고자 한다.",
    thumbnail: "/assets/works/mo/MO_SRA_00.png",
    images: [],
  },
  {
    id: 20, name: "잔상", members: ["이유진"], category: "MOTION",
    description: "우리는 정말로 저장하고 있을까? 종이라는 매체에서 벗어나 디지털로 도약한 현대인들은 인류 역사상 가장 많은 기록물을 생산하는 시대에 살고 있지만, 동시에 가장 많은 정보를 잃어버리고 있기도 하다. 급격한 기술 발전이 현대인들에게 편리함을 안겨준 동시에, 기록의 영속성을 앗아간 셈이다. 프로젝트 <잔상>은 디지털 데이터의 불안정성에 대해 조명하고, 기록이라는 행위의 본질적인 의미를 다시금 생각해 볼 수 있는 기회를 제공한다.",
    thumbnail: "/assets/works/mo/MO_잔상_00.jpg",
    images: [],
  },
  {
    id: 21, name: "COVER : 방송*", members: ["정가람"], category: "MOTION",
    description: "COVER:방송*은 인터넷 탐정의 진실과 거짓, 선과 악을 밝히는 이야기를 노래한 뮤직비디오이다. 노래의 화자는 인터넷 세상 속 정보를 의심하고 진위 여부를 밝히는 탐정이지만, 상대를 믿고 싶은 마음이 있다는 것이 진심이라는 것을 고백한다.",
    thumbnail: "/assets/works/mo/MO_COVER_방송_00.jpg",
    images: [],
  },
  {
    id: 22, name: "신화(神火)의 부름", members: ["정윤서"], category: "MOTION",
    description: "도자기 세계관을 배경으로 한 몰입형 XR 프로젝트 \"Roam in Ceram\"의 시네마틱 트레일러이다. 인게임의 주요 맵과 세계관 스토리를 중심으로, 플레이어가 탐험하게 될 세계를 소개하며 세상을 여행하는 주인공의 프롤로그를 서사적인 비주얼로 담아냈다.",
    thumbnail: "/assets/works/mo/MO_신화(神火)의 부름_00.webp",
    images: [],
  },
  {
    id: 23, name: "OMEGA POINT", members: ["조연진"], category: "MOTION",
    description: "가상의 약물을 소재로 한 페이크 다큐멘터리 영상이다. 타인에 대한 이해는 침범과도 같다는 주제의식을 건조한 임상실험 내용을 통해 전개한다.",
    thumbnail: "/assets/works/mo/MO_OMEGA_POINT_00.jpg",
    images: [],
  },
  {
    id: 24, name: "ECHO | Opening Cinematic", members: ["황태희"], category: "MOTION",
    description: "게임의 인트로 영상으로, 세계관과 현재 상황을 이해할 수 있도록 구성하였다. 세상이 무너지게 된 배경과, 주인공 에코가 희망을 되찾기 위한 여정을 시작하게 되는 장면을 담았다.",
    thumbnail: "/assets/works/mo/MO_ECHO_00.webp",
    images: [],
  },
  {
    id: 25, name: "UNBECOMING", members: ["황희주"], category: "MOTION",
    description: "'품위 없는', '되어감(BECOMING)을 거부함'. 사회가 규정한 정상성의 기준 속에서 억압된 자아가 해체와 재구성을 거쳐 새로운 변종적 존재로 이행하는 과정을 담은 스톱모션 애니메이션이다. 음식과 신체, 점토의 변형을 통해 사회적 규범이 개인의 몸과 정체성을 어떻게 왜곡하고 재구성하는지를 시각적으로 드러낸다.",
    thumbnail: "/assets/works/mo/MO_UNBECOMING_00.jpg",
    images: [],
  },
];

export type Work = { id: number; name: string; members: string[]; category: string; thumbnail?: string; images?: string[] };

export const works: Work[] = [
  // ── UI ──────────────────────────────────────────────────────────────────
  { id: 1,  name: "ANYWAY",          members: ["김지유", "서한이"],                        category: "UI", thumbnail: "/assets/works/ui/UI_ANYWAY_00.jpg",  images: ["/assets/works/ui/UI_ANYWAY_01.jpg","/assets/works/ui/UI_ANYWAY_02.jpg","/assets/works/ui/UI_ANYWAY_03.jpg","/assets/works/ui/UI_ANYWAY_04.jpg","/assets/works/ui/UI_ANYWAY_05.jpg","/assets/works/ui/UI_ANYWAY_06.jpg","/assets/works/ui/UI_ANYWAY_07.jpg","/assets/works/ui/UI_ANYWAY_08.jpg"] },
  { id: 2,  name: "Steps",           members: ["김태린"],                                  category: "UI", thumbnail: "/assets/works/ui/UI_Steps_00.jpg",   images: ["/assets/works/ui/UI_Steps_01.jpg"] },
  { id: 3,  name: "Suners",          members: ["진민서"],                                  category: "UI", thumbnail: "/assets/works/ui/UI_Suners_.jpg",    images: [] },

  // ── UX ──────────────────────────────────────────────────────────────────
  { id: 14, name: "RENO",            members: ["김도연", "박서하", "천세진", "현명화"],    category: "UX", thumbnail: "/assets/works/ux/UX_RENO_00.jpg",    images: [] },
  { id: 15, name: "NURO",            members: ["김도연", "윤내경"],                        category: "UX", thumbnail: "/assets/works/ux/UX_NURO_00.jpg",    images: [] },
  { id: 26, name: "BIMO",            members: ["김수민", "박채원", "서유정", "전지민"],    category: "UX", thumbnail: "/assets/works/ux/UX_BIMO_00.jpg",    images: ["/assets/works/ux/UX_BIMO_01.jpg","/assets/works/ux/UX_BIMO_02.jpg","/assets/works/ux/UX_BIMO_03.jpg","/assets/works/ux/UX_BIMO_04.jpg","/assets/works/ux/UX_BIMO_05.jpg","/assets/works/ux/UX_BIMO_06.jpg","/assets/works/ux/UX_BIMO_07.jpg"] },
  { id: 27, name: "닿음",            members: ["김지아", "김지유", "서한이"],              category: "UX", thumbnail: "/assets/works/ux/UX_닿음_00.jpg",    images: ["/assets/works/ux/UX_닿음_01.jpg","/assets/works/ux/UX_닿음_02.jpg","/assets/works/ux/UX_닿음_03.jpg","/assets/works/ux/UX_닿음_04.jpg","/assets/works/ux/UX_닿음_05.jpg","/assets/works/ux/UX_닿음_06.jpg","/assets/works/ux/UX_닿음_07.jpg","/assets/works/ux/UX_닿음_08.jpg"] },
  { id: 28, name: "COCO",            members: ["김태린", "진민서"],                        category: "UX", thumbnail: "/assets/works/ux/UX_COCO_00.png",    images: ["/assets/works/ux/UX_COCO_01.png","/assets/works/ux/UX_COCO_02.png","/assets/works/ux/UX_COCO_03.png","/assets/works/ux/UX_COCO_04.png","/assets/works/ux/UX_COCO_05.png","/assets/works/ux/UX_COCO_06.png","/assets/works/ux/UX_COCO_07.png","/assets/works/ux/UX_COCO_08.png","/assets/works/ux/UX_COCO_09.png","/assets/works/ux/UX_COCO_10.png"] },

  // ── XR ──────────────────────────────────────────────────────────────────
  { id: 4,  name: "십이지신",        members: ["김도연", "김수민", "서유정"],              category: "XR", thumbnail: "/assets/works/xr/XR_십이지신_00.jpg",            images: ["/assets/works/xr/XR_십이지신_01.png","/assets/works/xr/XR_십이지신_02.png","/assets/works/xr/XR_십이지신_03.png","/assets/works/xr/XR_십이지신_04.jpg","/assets/works/xr/XR_십이지신_05.png","/assets/works/xr/XR_십이지신_06.png","/assets/works/xr/XR_십이지신_07.png","/assets/works/xr/XR_십이지신_08.png"] },
  { id: 5,  name: "Bloop!",          members: ["김채현"],                                  category: "XR", thumbnail: "/assets/works/xr/XR_Bloop!_00.jpg",              images: ["/assets/works/xr/XR_Bloop!_01.jpg","/assets/works/xr/XR_Bloop!_02.jpg","/assets/works/xr/XR_Bloop!_03.jpg","/assets/works/xr/XR_Bloop!_04.jpg"] },
  { id: 6,  name: "디지털 갠지스",   members: ["박서영"],                                  category: "XR", thumbnail: "/assets/works/xr/XR_디지털_갠지스_00.jpg",        images: ["/assets/works/xr/XR_디지털_갠지스_01.jpg","/assets/works/xr/XR_디지털_갠지스_02.jpg","/assets/works/xr/XR_디지털_갠지스_03.jpg","/assets/works/xr/XR_디지털_갠지스_04.jpg","/assets/works/xr/XR_디지털_갠지스_05.jpg"] },
  { id: 7,  name: "noon",            members: ["박소정"],                                  category: "XR", thumbnail: "/assets/works/xr/XR_noon_박소정.jpg",              images: [] },
  { id: 8,  name: "도달점",          members: ["이유진"],                                  category: "XR", thumbnail: "/assets/works/xr/XR_도달점_00.jpg",               images: [] },
  { id: 9,  name: "온스테이지",      members: ["전지민"],                                  category: "XR", thumbnail: "/assets/works/xr/xr_온스테이지_00.jpg",            images: [] },
  { id: 10, name: "",                members: ["정윤서"],                                  category: "XR" },
  { id: 11, name: "KEMIDEA",         members: ["정지연"],                                  category: "XR", thumbnail: "/assets/works/xr/XR_KEMIDEA_00.png",              images: [] },
  { id: 12, name: "FALMKA INTERCALARIS", members: ["조연진"],                             category: "XR", thumbnail: "/assets/works/xr/XR_FALMKA_INTERCALARIS_00.jpg",  images: [] },
  { id: 13, name: "",                members: ["황태희"],                                  category: "XR" },

  // ── MOTION ──────────────────────────────────────────────────────────────
  { id: 16, name: "Onit",            members: ["김도연", "현명화"],                        category: "MOTION", thumbnail: "/assets/works/mo/MO_Onit_00.jpg",             images: [] },
  { id: 17, name: "얻",              members: ["김지아", "김채현", "윤내경"],              category: "MOTION", thumbnail: "/assets/works/mo/MO_얻_00.jpg",               images: ["/assets/works/mo/MO_얻_01.jpg","/assets/works/mo/MO_얻_02.jpg","/assets/works/mo/MO_얻_03.jpg","/assets/works/mo/MO_얻_04.jpg","/assets/works/mo/MO_얻_05.jpg","/assets/works/mo/MO_얻_06.jpg","/assets/works/mo/MO_얻_07.jpg","/assets/works/mo/MO_얻_08.jpg","/assets/works/mo/MO_얻_09.jpg"] },
  { id: 18, name: "Pieces Into One", members: ["박서영"],                                  category: "MOTION", thumbnail: "/assets/works/mo/MO_Pieces_Into_One_00.jpg",  images: ["/assets/works/mo/MO_Pieces_Into_One_01.jpg","/assets/works/mo/MO_Pieces_Into_One_02.jpg","/assets/works/mo/MO_Pieces_Into_One_03.jpg","/assets/works/mo/MO_Pieces_Into_One_04.jpg","/assets/works/mo/MO_Pieces_Into_One_05.jpg","/assets/works/mo/MO_Pieces_Into_One_06.jpg"] },
  { id: 19, name: "SRA",             members: ["박서하", "천세진"],                        category: "MOTION", thumbnail: "/assets/works/mo/MO_SRA_00.png",              images: [] },
  { id: 20, name: "잔상",            members: ["이유진"],                                  category: "MOTION", thumbnail: "/assets/works/mo/MO_잔상_00.jpg",             images: [] },
  { id: 21, name: "COVER 방송",      members: ["정가람"],                                  category: "MOTION", thumbnail: "/assets/works/mo/MO_COVER_방송_00.jpg",       images: [] },
  { id: 22, name: "",                members: ["정윤서"],                                  category: "MOTION" },
  { id: 23, name: "OMEGA POINT",     members: ["조연진"],                                  category: "MOTION", thumbnail: "/assets/works/mo/MO_OMEGA_POINT_00.jpg",      images: [] },
  { id: 24, name: "",                members: ["황태희"],                                  category: "MOTION" },
  { id: 25, name: "UNBECOMING",      members: ["황희주"],                                  category: "MOTION", thumbnail: "/assets/works/mo/MO_UNBECOMING_00.jpg",       images: [] },
];

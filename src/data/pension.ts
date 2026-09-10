// 숲속의바다 펜션 데이터
// 출처: www.woodinsea.com (2026-09-10 전수 이관) + NOL(야펜) 요금표(ypIdx 33340) + 메인 팝업 안내

export const pensionInfo = {
  name: "숲속의바다",
  nameFull: "태안 숲속의바다펜션",
  nameEn: "SEA IN THE FOREST",
  tagline: "파란 하늘과 수많은 별빛이 가득한 펜션",
  description:
    "태안 이원면 언덕 위, 가로림만이 한눈에 들어오는 클래식 스타일의 목조 펜션. 전 객실 오션뷰와 개별 월풀형 욕조, 오션뷰 실내 바베큐 테라스에서 온전한 쉼을 누리세요.",
  phone: "010-5613-1419",
  landline: "041-675-1222",
  address: "충남 태안군 이원면 원이로 2170-5",
  addressJibun: "충남 태안군 이원면 내리 1148-11",
  instagram: "stay_forestsea",
  instagramUrl: "https://www.instagram.com/stay_forestsea/",
  instagramTagUrl: "https://www.instagram.com/explore/tags/숲속의바다",
  naverBlogSearchUrl:
    "https://search.naver.com/search.naver?where=post&sm=tab_pge&query=숲속의바다",
  checkIn: "15:00",
  checkInPeak: "16:00",
  checkInUntil: "22:00",
  checkOut: "11:00",
  checkOutOffSeasonWeekday: "12:00",
  businesses: [
    { name: "숲속동", owner: "정규정", bizNumber: "874-71-00774", license: "제2025-71호" },
    { name: "바다동", owner: "정지연", bizNumber: "107-37-90639", license: "제2026-15호" },
  ],
  yapenId: "33340",
  naverPlaceId: "12146230",
  naverBookingUrl: "https://booking.naver.com/booking/3/bizes/182792/search?area=plt",
  yapenBookingUrl: "https://rev.yapen.co.kr/external/set?ypIdx=33340",
  tideTableUrl: "https://www.badatime.com/231.html",
  kakaoMapUrl:
    "https://map.kakao.com/?map_type=TYPE_MAP&from=roughmap&srcid=10553510&itemId=10553510&q=%EC%88%B2%EC%86%8D%EC%9D%98%EB%B0%94%EB%8B%A4%ED%8E%9C%EC%85%98&urlX=344469.0&urlY=950084.0",
  kakaoRoadviewUrl:
    "https://map.kakao.com/?from=roughmap&srcid=10553510&confirmid=10553510&q=%EC%88%B2%EC%86%8D%EC%9D%98%EB%B0%94%EB%8B%A4%ED%8E%9C%EC%85%98&rv=on",
  kakaoRouteUrl:
    "https://map.kakao.com/?from=roughmap&eName=%EC%88%B2%EC%86%8D%EC%9D%98%EB%B0%94%EB%8B%A4%ED%8E%9C%EC%85%98&eX=344469.0&eY=950084.0",
  naverMapUrl: "https://map.naver.com/p/entry/place/12146230",
};

// PROLOGUE — 원문 그대로
export const prologue = {
  label: "PROLOGUE",
  title: "숲속의바다펜션에\n당신을 초대합니다.",
  titleEn: "Welcome to Sea in the Forest",
  intro: "파란 하늘과 수많은 별빛이 가득한 숲속의바다펜션에 오신 것을 진심으로 환영합니다.",
  paragraphs: [
    "자연으로 오세요~ 자연과 호흡하러 편안하게 오세요~ 이곳은 여러분을 위한 따뜻한 쉼터가 있습니다.",
    "깨끗하고 조용하고 고즈넉한 분위기가 아름답게 펼쳐진 바다가 주는 그림 같은 풍경이 여러분을 기다리고 있습니다.",
    "저희 숲속의바다 펜션은 이원면에 위치한 클래식 스타일의 목조 펜션입니다. 펜션의 위치가 언덕 위에 있어 아름다운 바다와 자연 풍경이 한눈에 들어오며, 시설 또한 자연과의 조화를 이루어 목조주택으로 지어져 있어 자연의 냄새가 물씬 풍기는 펜션입니다.",
  ],
  invitation: [
    "오솔길 너머로 들리는 맑은 새소리, 햇빛창의 눈부심에 행복하게 눈 뜰 수 있는 곳!",
    "목조 건물의 깔끔하고 우아함의 매력 속으로 당신을 초대합니다.",
    "탁 트인 전망, 햇살 가득한 테라스, 여행의 소중함을 영원히 간직할 수 있는 곳!",
    "아름다운 숲속의바다펜션에서 멋진 추억을 만드세요~",
  ],
  motto: "당신에게 다정한 기억을 선물해 드립니다.",
  mottoEn: "WE'LL GIVE SOME SWEET MEMORIES FOR YOU",
};

export const heroImages = [
  { src: "/images/gallery/main/1.jpg", alt: "펜션 전경", title: "숲과 바다가 만나는 곳", subtitle: "태안 가로림만의 언덕 위 목조 펜션" },
  { src: "/images/gallery/special1/3.jpg", alt: "탁트인 바다 전망", title: "눈 앞에 펼쳐진 바다", subtitle: "전 객실 오션뷰 · 개별 테라스" },
  { src: "/images/gallery/special1/7.jpg", alt: "서해 일몰", title: "일출과 월출을 객실에서", subtitle: "가로림만의 잔잔한 수면 위 햇살" },
  { src: "/images/gallery/room1/1.jpg", alt: "아늑한 객실 내부", title: "따뜻한 목조 인테리어", subtitle: "편안함과 아늑함이 공존하는 공간" },
  { src: "/images/gallery/special2/3.jpg", alt: "월풀형 욕조", title: "프라이빗 월풀형 욕조", subtitle: "전 객실 개별 완비" },
  { src: "/images/gallery/special4/1.jpg", alt: "바베큐 테라스", title: "오션뷰 실내 바베큐 테라스", subtitle: "사계절 바다를 보며 즐기는 바베큐" },
  { src: "/images/gallery/special5/1.jpg", alt: "수영장", title: "워터 슬라이드 야외 수영장", subtitle: "바다가 보이는 여름의 추억" },
  { src: "/images/gallery/special6/1.jpg", alt: "소나무 숲", title: "소나무 향 가득한 힐링", subtitle: "숲속 산책로와 야외 카페" },
];

// 전 객실 공통 안내(원문)
export const roomCommon = {
  intro: [
    "숲속의바다 펜션의 모든 객실은 아름다운 오션뷰를 자랑합니다.",
    "객실마다 개별적인 바베큐 테라스를 가지고 있습니다.",
  ],
  invite:
    "따뜻하고 포근한 인테리어의 객실과 창문 밖에 보이는 소나무 그 너머의 시원한 바다를 보며 여행의 여유로움을 즐겨보세요.",
  amenities: ["오션뷰", "월풀형 욕조", "실내 바베큐 테라스", "와인잔·소주잔·맥주잔 구비"],
};

export type RoomPrices = { weekday: number; friday: number; weekend: number; sunday: number };

export interface Room {
  id: string;
  name: string;
  nameEn: string;
  building: "숲속동" | "바다동";
  description: string;
  features: string[];
  images: { src: string; alt: string }[];
  mainImage: string;
  capacity: { standard: number; max: number };
  size: string;
  sizeM2: number;
  pyeong: number;
  prices: RoomPrices; // NOL(야펜) 요금표 2026-09 기준 · 실제 적용일에 따라 달라질 수 있음
  vip?: boolean;
}

const gallery = (dir: string, n: number, label: string) =>
  Array.from({ length: n }, (_, i) => ({ src: `/images/gallery/${dir}/${i + 1}.jpg`, alt: `${label} ${i + 1}` }));

const FEATURES = ["오션뷰", "개별 테라스", "실내 바베큐", "월풀형 욕조"];

export const rooms: Room[] = [
  {
    id: "roomba", name: "룸바", nameEn: "ROOMBA", building: "숲속동",
    description: "따뜻하고 포근한 인테리어의 객실과 창문 밖 소나무 그 너머의 시원한 바다를 보며 여행의 여유로움을 즐겨보세요.",
    features: FEATURES, images: gallery("room1", 12, "룸바"), mainImage: "/images/gallery/room1/1.jpg",
    capacity: { standard: 2, max: 2 }, size: "30㎡ / 9평", sizeM2: 30, pyeong: 9,
    prices: { weekday: 140000, friday: 160000, weekend: 180000, sunday: 140000 },
  },
  {
    id: "landora", name: "란도라", nameEn: "LANDORA", building: "숲속동",
    description: "아늑한 목조 침실과 바다를 향한 창. 둘만의 조용한 시간을 위한 커플 객실입니다.",
    features: FEATURES, images: gallery("room3", 10, "란도라"), mainImage: "/images/gallery/room3/1.jpg",
    capacity: { standard: 2, max: 2 }, size: "30㎡ / 9평", sizeM2: 30, pyeong: 9,
    prices: { weekday: 140000, friday: 160000, weekend: 180000, sunday: 140000 },
  },
  {
    id: "bluemoon", name: "블루문", nameEn: "BLUEMOON", building: "숲속동",
    description: "푸른 달빛 아래 바다를 바라보며 로맨틱한 시간을 보낼 수 있는 커플 맞춤 객실입니다.",
    features: FEATURES, images: gallery("room4", 10, "블루문"), mainImage: "/images/gallery/room4/1.jpg",
    capacity: { standard: 2, max: 2 }, size: "30㎡ / 9평", sizeM2: 30, pyeong: 9,
    prices: { weekday: 140000, friday: 160000, weekend: 180000, sunday: 140000 },
  },
  {
    id: "lora", name: "로라", nameEn: "LORA", building: "숲속동",
    description: "모던하면서도 편안한 분위기의 객실에서 일상의 피로를 풀어보세요.",
    features: FEATURES, images: gallery("room5", 10, "로라"), mainImage: "/images/gallery/room5/1.jpg",
    capacity: { standard: 2, max: 3 }, size: "40㎡ / 12평", sizeM2: 40, pyeong: 12,
    prices: { weekday: 110000, friday: 120000, weekend: 160000, sunday: 110000 },
  },
  {
    id: "elle", name: "엘르", nameEn: "ELLE", building: "숲속동",
    description: "우아하고 세련된 인테리어가 돋보이는 감각적인 공간입니다.",
    features: FEATURES, images: gallery("room6", 10, "엘르"), mainImage: "/images/gallery/room6/1.jpg",
    capacity: { standard: 2, max: 3 }, size: "40㎡ / 12평", sizeM2: 40, pyeong: 12,
    prices: { weekday: 160000, friday: 190000, weekend: 220000, sunday: 160000 },
  },
  {
    id: "angela", name: "안젤라", nameEn: "ANGELA", building: "바다동",
    description: "천사처럼 포근하고 아늑한 분위기에서 편안한 휴식을 취해보세요. 가족 여행에 알맞은 넉넉한 크기입니다.",
    features: FEATURES, images: gallery("room7", 10, "안젤라"), mainImage: "/images/gallery/room7/1.jpg",
    capacity: { standard: 2, max: 4 }, size: "53㎡ / 16평", sizeM2: 53, pyeong: 16,
    prices: { weekday: 180000, friday: 220000, weekend: 240000, sunday: 180000 },
  },
  {
    id: "sahara", name: "사하라", nameEn: "SAHARA", building: "바다동",
    description: "이국적인 분위기와 함께 특별한 여행의 기분을 느껴보세요.",
    features: FEATURES, images: gallery("room8", 10, "사하라"), mainImage: "/images/gallery/room8/1.jpg",
    capacity: { standard: 2, max: 4 }, size: "53㎡ / 16평", sizeM2: 53, pyeong: 16,
    prices: { weekday: 180000, friday: 220000, weekend: 240000, sunday: 180000 },
  },
  {
    id: "margaret", name: "마가렛", nameEn: "MARGARET", building: "바다동",
    description: "꽃처럼 화사하고 밝은 분위기의 객실에서 힐링 타임을 즐기세요.",
    features: FEATURES, images: gallery("room9", 10, "마가렛"), mainImage: "/images/gallery/room9/1.jpg",
    capacity: { standard: 2, max: 4 }, size: "53㎡ / 16평", sizeM2: 53, pyeong: 16,
    prices: { weekday: 180000, friday: 220000, weekend: 240000, sunday: 180000 },
  },
  {
    id: "rococo", name: "로코코", nameEn: "ROCOCO", building: "바다동",
    description: "클래식하면서도 화려한 로코코 스타일의 특별한 공간입니다.",
    features: FEATURES, images: gallery("room10", 10, "로코코"), mainImage: "/images/gallery/room10/1.jpg",
    capacity: { standard: 2, max: 4 }, size: "53㎡ / 16평", sizeM2: 53, pyeong: 16,
    prices: { weekday: 180000, friday: 220000, weekend: 240000, sunday: 180000 },
  },
  {
    id: "rosanna", name: "로잔나VIP", nameEn: "ROSANNA VIP", building: "바다동", vip: true,
    description: "장미처럼 아름답고 로맨틱한 분위기의 VIP 객실입니다.",
    features: FEATURES, images: gallery("room11", 10, "로잔나VIP"), mainImage: "/images/gallery/room11/1.jpg",
    capacity: { standard: 2, max: 4 }, size: "66㎡ / 20평", sizeM2: 66, pyeong: 20,
    prices: { weekday: 200000, friday: 240000, weekend: 280000, sunday: 200000 },
  },
  {
    id: "momoka", name: "모모카VIP", nameEn: "MOMOKA VIP", building: "바다동", vip: true,
    description: "복숭아꽃처럼 사랑스럽고 따뜻한 분위기의 VIP 공간입니다.",
    features: FEATURES, images: gallery("room12", 10, "모모카VIP"), mainImage: "/images/gallery/room12/1.jpg",
    capacity: { standard: 2, max: 4 }, size: "66㎡ / 20평", sizeM2: 66, pyeong: 20,
    prices: { weekday: 200000, friday: 240000, weekend: 280000, sunday: 200000 },
  },
  {
    id: "charleston", name: "찰스톤", nameEn: "CHARLESTON", building: "바다동",
    description: "빈티지한 매력과 현대적 편안함이 조화를 이루는 대형 객실. 단체·가족 모임에 알맞습니다.",
    features: FEATURES, images: gallery("room13", 10, "찰스톤"), mainImage: "/images/gallery/room13/1.jpg",
    capacity: { standard: 4, max: 8 }, size: "129㎡ / 39평", sizeM2: 129, pyeong: 39,
    prices: { weekday: 330000, friday: 390000, weekend: 450000, sunday: 330000 },
  },
];

export interface Special {
  id: string;
  number: string;
  name: string;
  nameEn: string;
  summary: string;
  paragraphs: string[];
  bullets?: string[];
  notes?: string[];
  images: { src: string; alt: string }[];
  icon: string;
}

export const specialsIntro =
  "바다가 보이는 수영장부터 전 객실 개별 월풀형 욕조와 오션뷰 바베큐장, 갯벌체험, 4계절 모두 꽃이 피는 바다 정원 등 숲속의바다펜션만의 특별함을 소개합니다.";

export const specials: Special[] = [
  {
    id: "ocean-view", number: "01", name: "바다전망", nameEn: "OCEAN VIEW", icon: "Waves",
    summary: "모든 객실에서 서해 바다가 펼쳐집니다. 일출과 월출을 모두 객실에서 감상할 수 있습니다.",
    paragraphs: [
      "모든 객실에서 서해 바다가 펼쳐집니다. 침대에 누워 있으면 파도 소리가 배경음이 되고, 실내 개별 테라스 창을 열면 가로림만의 잔잔한 수면 위로 햇살이 번져 있어요.",
      "특히 일출과 월출을 모두 객실에서 감상할 수 있다는 점이 포인트입니다. 개별 테라스에서 바다와 함께 차 한잔의 여유를 즐겨 보세요.",
    ],
    images: gallery("special1", 10, "바다전망"),
  },
  {
    id: "whirlpool", number: "02", name: "월풀형 욕조", nameEn: "WHIRLPOOL BATH", icon: "Bath",
    summary: "전 객실 프라이빗 월풀형 욕조. 원하는 시간에 따뜻한 물에 몸을 맡기세요.",
    paragraphs: [
      "모든 객실 프라이빗 월풀형 욕조. 조용히 쉬고 싶을 때 객실 안 개별 월풀형 욕조에서 언제든 원하는 시간에, 따뜻한 물에 몸을 맡기고 몸의 긴장과 마음의 피로를 풀어 보세요!",
    ],
    images: gallery("special2", 8, "월풀형 욕조"),
  },
  {
    id: "tidal-flat", number: "03", name: "갯벌체험", nameEn: "SEA EXPERIENCE", icon: "Shell",
    summary: "펜션 밑 해변·꾸지나무골·용난굴의 무료 갯벌체험부터 만대 어촌체험마을의 유료 체험까지.",
    paragraphs: [
      "펜션 밑 모래사장과 갯벌이 있는 해변, 꾸지나무골해수욕장, 용난굴에서는 간단한 갯벌 체험, 만대 어촌 체험 마을에서는 유료 갯벌 체험(독살체험, 설게 잡기 등) 여러 가지 바다 체험을 하실 수 있습니다.",
      "아이들과 즐거운 바다체험 하시고 좋은 추억 만드시길 바랍니다.",
    ],
    bullets: [
      "꾸지나무골 해수욕장, 용난굴 : 갯벌 체험 무료 이용 가능",
      "만대 어촌체험 마을 : 갯벌 체험 유료 이용 가능 (4월부터 장비 대여, 독살체험, 설게 잡기 등) 010-2637-4592 문의",
      "여섬 : 만대항 들어가기 전 염전 왼쪽 대각선 길로 10분 정도 걸어서 들어가기 (돌 속에 낙지, 소라 등)",
      "만대항 : 간조 때 낚시 가능(우럭 등), 꽃게, 소라, 조개 등",
      "펜션 밑 바다 정원 해변 : 만조 1시간 전부터 농어 등 낚시",
      "이원방조제(펜션 오시기 전) : 와우제에서 좌회전, 이원방조제 옆 오른쪽 위로 차 타고 올라가면 주차·화장실·조개통 씻는 곳 있음. 폐양식장까지 1.5km 대각선으로 가면 소라, 꽃게, 동죽 등",
    ],
    images: gallery("special3", 8, "갯벌체험"),
  },
  {
    id: "bbq", number: "04", name: "바베큐 개별테라스", nameEn: "BARBECUE", icon: "Flame",
    summary: "전 객실 오션뷰 실내 바베큐 테라스. 사계절 바다를 바라보며 바베큐를 즐기세요.",
    paragraphs: [
      "어떤 날은 멀리 안 나가고 객실 안에서 조용히 쉬고 싶을 때가 있죠. 모든 객실의 실내 개별 테라스에서 사계절 모두 바다를 바라보면서 맛있는 바베큐나 회 등을 즐길 수 있습니다.",
      "좋은 풍경을 보면서 맛있는 것을 먹고 따뜻한 월풀형 욕조, 쉼의 정점이 된답니다. (전 객실 와인잔, 소주잔, 맥주잔 구비)",
    ],
    bullets: [
      "실내 바베큐장 이용은 숯 또는 연기 잡는 전기 그릴(1만원) 중 선택 가능",
      "숯+망 2~4인 기준 1회 20,000원 / 5~8인 기준(찰스톤은 4~8인) 30,000원 / 9인 이상 40,000원",
      "바베큐는 각 객실 안 오션뷰 개별 실내 바베큐장에서 가능 (입실 시 현장 결제)",
      "단체가 이용할 수 있는 오션뷰 실외 바베큐장도 있습니다 (숲속동 앞)",
    ],
    notes: [
      "실내 바베큐장에는 난로·에어컨이 없어 여름·겨울에는 연기 잡는 전기 그릴이 더 편하실 수 있습니다.",
      "실내 바베큐장은 음식점 덕트가 아닌 환풍기가 장착되어 있어 숯 사용 시 연기가 발생할 수 있습니다.",
      "안전을 위해 바베큐장 사용 시 객실 문을 꼭 닫으시고, 이용 후 환풍기를 끄고 뚜껑을 꼭 덮어 주세요. 절대로 불을 끄기 위해 화구에 물을 넣지 마세요 (모터 고장·전기 스파크 화재 위험).",
      "객실 내 육류(삼겹살/튀김류) 구이, 해물찜은 금지입니다. 화재 및 냄새로 인한 타 손님 배려 차원입니다.",
      "목조 건물·원목 가구·소나무가 많아 화재 위험이 있습니다. 개인 화기(버너), 캔들, 폭죽, 장작 등 불을 사용하는 물품은 '절대' 금지입니다.",
      "화재 발생 시 실내 바베큐장·객실의 소화기를 이용해 주시고, 긴급 상황 시 041-675-1222로 연락 부탁드립니다.",
    ],
    images: gallery("special4", 8, "바베큐"),
  },
  {
    id: "pool", number: "05", name: "수영장과 모래해변", nameEn: "POOL & SANDY BEACH", icon: "Droplets",
    summary: "여름이면 문을 여는 오션뷰 워터 슬라이드 야외 수영장과 바로 아래 고운 모래 해변.",
    paragraphs: [
      "여름이면 펜션 앞 야외 수영장이 문을 엽니다. 눈 앞의 바다를 바라보며 워터 슬라이드 등 물놀이는 물론, 수영장 바로 아래에는 작지만 고운 모래 해변이 있어 바다와 수영장 모두를 즐기실 수 있습니다.",
    ],
    bullets: [
      "운영 일자 : 6월 27일부터 8월 31일까지 (운영 시간·기간은 변경될 수 있습니다)",
      "운영 시간 : 아침 10시 ~ 저녁 7시 (저녁 7시 ~ 아침 10시는 청소 시간으로 약제 투입)",
      "규모 : 가로 20m, 세로 5m, 수심 1.2m",
      "복장 : 수영복 또는 면티·면 반바지 (검은색 옷은 소독약에 의해 탈색·변색될 수 있습니다)",
    ],
    notes: [
      "수영장 위생을 위해 음식물 반입을 금지하며, 음주 후 수영장 이용은 익사 위험이 있어 절대 금지입니다.",
      "수영장에서 뛰어다니면 미끄러져 다칠 수 있습니다.",
      "해변 투어·모래놀이·갯벌 놀이 후에는 수영장 계단 밑 수돗가에서 발·손을 꼭 씻고 이용해 주세요.",
      "입수 전 준비운동을 충분히 합니다. 다이빙은 금지이며 워터 슬라이드 이용 시 안전사고에 유의해 주세요.",
      "어린이는 반드시 보호자와 동행하며 보호장비를 꼭 착용해야 합니다.",
      "본 수영장은 무료이며 안전요원이 없으므로 보호자께서 세심한 주의를 기울여 주시기 바랍니다.",
      "저녁 7시 ~ 아침 10시 청소 시간에는 약제 투입으로 침전물이 형성되어 출입을 절대 금지합니다.",
    ],
    images: gallery("special5", 8, "수영장"),
  },
  {
    id: "cafe", number: "06", name: "야외카페 & 산책로", nameEn: "CAFE & HIKING TRAIL", icon: "Coffee",
    summary: "바다로 미로처럼 이어지는 오솔길 끝, 낭만적인 야외카페(쉼터)와 후망산 등산로.",
    paragraphs: [
      "펜션에서 바다로 미로처럼 이어지는 오솔길을 따라 해변으로 가면 낭만적인 야외카페(쉼터)가 있습니다. 숲 속 쉼터에 앉아 바다를 보면서 몸의 긴장, 마음의 피로를 풀어 보세요. 여러분의 따뜻한 쉼터가 될 것입니다.",
    ],
    bullets: ["펜션 뒤편에도 작은 쉼터가 있고 후망산 등산로가 있어 가벼운 산책을 할 수 있습니다."],
    images: gallery("special6", 8, "야외카페"),
  },
  {
    id: "garden", number: "07", name: "바다꽃정원", nameEn: "FLOWER GARDEN", icon: "Flower2",
    summary: "사계절 꽃이 피는 작은 수목원. 바다로 이어지는 드넓은 정원과 쏟아지는 별빛.",
    paragraphs: [
      "숲속의바다 펜션 정원에는 사계절 꽃이 피는 작은 수목원이 있습니다.",
      "펜션에서 바다로 미로처럼 이어지는 드넓은 바다정원은 마치 오즈의 마법사의 이야기에 나올 것 같습니다. 바다꽃정원을 산책하다 보면 어느새 저녁이 되어 있고, 쏟아지는 별빛에 도로시처럼 주인공이 되어 시간여행을 하게 된답니다.",
      "셀 수 없을 만큼 쏟아지는 별의 수만큼 저마다 이야기를 품고 있지 않을까요? 숲속의바다에서 여러분을 동화 속 주인공으로 초대합니다.",
    ],
    bullets: [
      "봄 : 영춘화, 홍매화, 길마가지나무꽃, 크리스마스로즈, 복수초, 돌부채꽃, 백매화, 크로커스, 나팔수선화, 수선화, 은방울수선화, 천리향, 서향, 동백꽃(붉은·백·혼색), 중국패모, 진달래, 라넌큘러스, 아네모네, 벚꽃, 튤립, 앵도나무꽃, 꽃복숭아, 죽단화, 박태기나무꽃, 양벚나무꽃, 연산홍과 철쭉, 꽃잔디, 줄딸기꽃, 큰꽃으아리, 매발톱꽃, 긴병꽃풀, 작약, 말발도리, 장미, 야생화",
      "여름 : 수국, 오스테오스퍼멈, 야생화",
      "가을 : 국화, 수국, 사철장미, 오스테오스퍼멈, 야생화",
      "겨울 : 서향 동백꽃, 구골나무, 사철장미",
    ],
    images: gallery("special7", 8, "꽃정원"),
  },
];

export interface Tour {
  id: string;
  number: string;
  name: string;
  distance: string;
  minutes: number;
  description: string;
  images: string[];
}

export const tours: Tour[] = [
  {
    id: "ggujinamu", number: "01", name: "꾸지나무골해수욕장", distance: "차량 6분", minutes: 6,
    description: "작고 아담한 해변이 특징이고, \"아늑하고 정겹다\"는 표현이 어울릴 듯한 곳입니다. 계속 안으로 가면 만대포구가 나오는데 반도 끝 지점으로 건너편으로 팔봉면 구도가 보이고, 옆으로는 대산 돗곶(대산석유화학단지)이 보입니다.",
    images: ["/images/gallery/tour1/1.jpg", "/images/gallery/tour1/2.jpg", "/images/gallery/tour1/3.jpg"],
  },
  {
    id: "mandae", number: "02", name: "만대포구", distance: "차량 10분", minutes: 10,
    description: "포구에 기항하는 고깃배는 40여 척. 이원반도의 해수욕장을 찾는 여행자들은 이곳에서 횟감과 매운탕거리를 사갑니다. 포구 직전 왼편 산등성이 길을 따라가면 '작은구매', '큰구매'라는 아늑한 모래 해변을 만나고, 작은구매 앞바다의 삼형제바위까지는 썰물 때 걸어갈 수 있습니다.",
    images: ["/images/gallery/tour2/1.jpg", "/images/gallery/tour2/2.jpg", "/images/gallery/tour2/3.jpg"],
  },
  {
    id: "sinduri", number: "03", name: "태안 신두리 해안사구", distance: "차량 30분", minutes: 30,
    description: "우리나라 최대의 해안사구 지대. 길이 약 3.4km, 폭 0.5~1.3km의 모래언덕에 금개구리·구렁이·맹꽁이가 서식하고 천연기념물 황조롱이도 관찰됩니다. 사막에서만 볼 수 있는 독특한 모래언덕이 아름다운 경관을 연출합니다.",
    images: ["/images/gallery/tour3/1.jpg", "/images/gallery/tour3/2.jpg", "/images/gallery/tour3/3.jpg"],
  },
  {
    id: "cheollipo", number: "04", name: "천리포수목원", distance: "차량 50분", minutes: 50,
    description: "약 60ha(18만평) 규모, 크게 7개 지역으로 나뉜 수목원. 각 지역의 토질·기후·기존 식물상을 고려해 다양한 식물 종류를 적절히 배치·관리하고 있는 힐링 명소입니다.",
    images: ["/images/gallery/tour4/1.jpg", "/images/gallery/tour4/2.jpg", "/images/gallery/tour4/3.jpg"],
  },
  {
    id: "anmyeondo", number: "05", name: "안면도 자연휴양림", distance: "차량 1시간", minutes: 60,
    description: "안면도 및 중부 해안 지역 자생 수종과 화목류·단풍류·야생초·유실수 등 31,670본(374종)이 식재되어 있습니다. 전망대에 오르면 서쪽으로 망망대해 서해가, 동남쪽으로 울창한 소나무 숲이 장관을 이룹니다.",
    images: ["/images/gallery/tour5/1.jpg", "/images/gallery/tour5/2.jpg", "/images/gallery/tour5/3.jpg"],
  },
  {
    id: "jurassic", number: "06", name: "안면도 쥬라기박물관", distance: "차량 50분", minutes: 50,
    description: "고생태 공룡들의 진화과정을 표본 화석으로 전시한 공룡전문 자연사 박물관. 자연사의 기초지식에서 첨단 자연과학에 이르는 체험전시물을 갖춘 안면도의 문화관광 거점 테마공원입니다.",
    images: ["/images/gallery/tour6/1.jpg", "/images/gallery/tour6/2.jpg", "/images/gallery/tour6/3.jpg"],
  },
  {
    id: "farmkamille", number: "07", name: "팜카밀레 허브농원", distance: "차량 40분", minutes: 40,
    description: "캐모마일·로즈·컬러·보태니컬·와일드·라벤더·토피어리 가든의 7개 테마 가든과 이곳에서만 맛볼 수 있는 허브빵, 허브 식사로 허브의 향기를 눈으로, 입으로, 코로 담아갈 수 있는 허브농원입니다.",
    images: [],
  },
  {
    id: "lightfestival", number: "08", name: "태안 빛축제장", distance: "차량 50분", minutes: 50,
    description: "200만 구의 LED 전구가 축제장을 화려하게 수놓습니다. 한여름 밤의 열기를 식혀주는 물놀이와 밤하늘 별을 보며 즐기는 빛축제, 온가족이 즐길 수 있는 축제입니다.",
    images: [],
  },
];

// 시설안내 — 펜션 기준 차량 거리
export const nearby = [
  { name: "꾸지나무골 해수욕장", minutes: 6 },
  { name: "만대항 땅끝마을 당봉 전망대", minutes: 10 },
  { name: "만대항 땅끝마을", minutes: 10 },
  { name: "용난굴(용이 승천한 동굴)", minutes: 11 },
  { name: "신두리 해수욕장", minutes: 30 },
  { name: "백화산 구름다리", minutes: 35 },
  { name: "백화산 냉천골 계곡", minutes: 40 },
];

export const transport = {
  car: {
    title: "네비게이션 이용 시",
    lines: ["도로명 주소 : 충남 태안군 이원면 원이로 2170-5", "지번 주소 : 충남 태안군 이원면 내리 1148-11"],
  },
  bus: {
    title: "대중교통 이용 시",
    lines: [
      "태안시외버스터미널까지 오신 후 만대행 시내버스를 타시고",
      "모세골 정류장이나 숲속의바다펜션 앞에서 하차하시면 됩니다.",
    ],
  },
};

export const priceInfo = {
  extraPerson: 20000,
  freeAge: "유치원 미만",
  rateRule: "주중 : 일요일~목요일 / 금요일 : 금요일 요금 / 주말 : 토요일, 법정공휴일 전날",
  seasonNote: "성수기, 준성수기 기간은 실시간 예약 달력을 참고하세요.",
  standardNote:
    "객실 요금은 기준 인원 2명에 대한 요금이며 기준 인원 초과 시 1인당, 1일당 추가 요금이 발생합니다. (찰스톤은 기준 인원 4명, 유치원 미만 무료, 유치원 이상은 20,000원 추가)",
  bbqPrices: [
    { persons: "2~4인", price: 20000 },
    { persons: "5~8인 (찰스톤 4~8인)", price: 30000 },
    { persons: "9인 이상", price: 40000 },
  ],
  bbqGrill: { name: "연기 잡는 전기 그릴", price: 10000 },
  bbqNotes: [
    "실내 바베큐장 이용은 숯 또는 연기 잡는 전기 그릴(1만원) 중 선택하실 수 있습니다.",
    "바베큐는 각 객실 안 오션뷰 개별 실내 바베큐장에서 가능합니다. (입실 시 현장 결제)",
    "단체가 이용할 수 있는 오션뷰 실외 바베큐장도 있습니다. (숲속동 앞)",
  ],
  cautions: [
    "미성년자는 보호자 동반 없이 이용하실 수 없습니다.",
    "애완동물은 타 객실 및 손님을 위해 입실을 금하오니 양해 바랍니다. (동반 입실 시 당일 예약 취소에 해당됩니다.)",
    "객실 내에서는 절대 금연입니다.",
  ],
};

// 이용안내 01~07 (원문)
export const guideSteps = [
  {
    no: "01", title: "입금 및 예약 확인",
    lines: [
      "입금 시 예약자와 입금자명이 다를 경우 필히 확인 전화 주십시오.",
      "실시간 예약 달력으로 예약 시 발송되는 문자(객실, 투숙일, 요금)를 확인하세요.",
    ],
  },
  {
    no: "02", title: "최대인원 초과 시",
    lines: ["최대인원 초과 시 입실 및 환불이 불가합니다. 1실 이상 예약은 반드시 사전 협의 후 예약하시기 바랍니다."],
  },
  {
    no: "03", title: "입실 시간",
    lines: [
      "이용 당일 16:00~22:00까지입니다. 비수기(연휴 ×) 입실 시간은 15:00~22:00까지입니다.",
      "22시 이후 펜션에 도착하실 경우 미리 연락하셔야 하며, 사전 연락이 없을 경우 입실 제한을 받을 수 있습니다.",
    ],
    highlight:
      "객실 준비 및 청소 시간 부족으로 2026.06.01부터 준성수기·성수기·연휴는 입실 시간이 16:00로 변경됩니다. 비수기·준성수기 1시간 이내 조기 입실은 입실 답 문자로 미리 연락 주시면 1만원 추가 시 가능합니다. 객실 청소 및 위생 관리를 위해 더 빠른 입실은 불가능합니다. (연휴·성수기는 유료 조기 입실 제외)",
  },
  {
    no: "04", title: "퇴실 시간",
    lines: ["마지막 이용일 오전 11시까지입니다. (비수기 평일은 12시까지) 다음 분을 위하여 퇴실 시간을 준수해 주시기 바랍니다."],
    highlight: "비수기 평일 12시 퇴실 이벤트 (퇴실 기준 월요일~금요일, 휴일 ×) — 퇴실 기준 토·일요일, 휴일, 준성수기, 성수기는 제외됩니다.",
  },
  {
    no: "05", title: "객실 정리",
    lines: [
      "퇴실하실 때 방 열쇠는 관리실 앞에 있는 바구니에 반납 부탁드립니다.",
      "이용 중 집기 파손 시에는 펜션지기에게 알려 주세요.",
      "쓰레기, 음식물 쓰레기, 분리수거는 지정된 장소에 분리 부탁드립니다.",
    ],
  },
  {
    no: "06", title: "취사 및 바베큐",
    lines: [
      "오후 9시 이후의 바베큐장 이용 및 고성방가는 타 객실 손님을 위하여 금하오니 양해 바랍니다.",
      "객실 내에서는 육류(삼겹살/튀김류) 구이, 해물찜을 금하오니 야외 바베큐장 및 객실 내 실내 바베큐장을 이용하시길 부탁드립니다. (화재 위험 및 냄새로 인한 다음 손님 배려 차원입니다.)",
    ],
  },
  {
    no: "07", title: "워터 슬라이드 야외 수영장",
    lines: [
      "운영 일자 : 6월 27일부터 8월 31일까지 / 운영 시간 : 아침 10시 ~ 저녁 7시 (이후 청소·약제 투입)",
      "수심 1.2m / 복장 : 수영복 또는 면티·면 반바지 (검은색 옷은 탈색·변색 가능)",
      "무료 수영장이며 안전요원이 없습니다. 어린이는 반드시 보호자와 동행하고 보호장비를 착용해 주세요.",
    ],
  },
];

export const refundPolicy = {
  intro: [
    "바른 예약문화 정착을 위하여 당 펜션에서는 예약 취소 시 환불 기준을 아래와 같이 운영하고 있사오니 꼭 확인을 하시고 예약해 주시기 바랍니다!",
    "환불액은 객실 전체 요금에서 환불됩니다. 환불은 입금자명으로 되며 입금 시 송금 수수료는 제외됩니다.",
    "예약 취소 시 소정의 위약금이 발생할 수 있습니다.",
  ],
  rows: [
    { when: "이용일 9일 전", deduct: 10 },
    { when: "이용일 8일 전", deduct: 20 },
    { when: "이용일 7일 전", deduct: 30 },
    { when: "이용일 6일 전", deduct: 40 },
    { when: "이용일 5일 전", deduct: 50 },
    { when: "이용일 4일 전", deduct: 60 },
    { when: "이용일 3일 전", deduct: 70 },
    { when: "이용일 2일 전", deduct: 80 },
    { when: "이용일 1일 전", deduct: 90 },
    { when: "입실일 당일", deduct: 100 },
  ],
  note: "연박의 경우 취소 시점별 취소 수수료율이 차등 적용되고, 취소 시점별 취소 수수료율이 등록되지 않은 기간에는 기본 취소 수수료율(0%)이 적용됩니다.",
};

// 메인 팝업 안내(입/퇴실시간, 브런치와 웰컴 무료, 할인, 이벤트)
export const services = [
  {
    id: "welcome", title: "웰컴 서비스", icon: "Gift",
    description: "컵라면, 과자, 음료, 생수(500ml) 중 1인당 1개씩 입실하실 때 숲속의바다 관리실 겸 매점에서 드립니다.",
  },
  {
    id: "brunch", title: "브런치 무료 서비스 (샌드위치와 주스)", icon: "Sandwich",
    description: "아침 9시쯤 완료 문자 드리면 9시 30분까지 숲속의바다 매점 겸 관리실에서 가져가신 후 객실이나 가시는 차 안에서 편하게 드시면 됩니다. (샌드위치와 주스 종류는 재료 수급 상황에 따라 변경될 수 있습니다.)",
  },
];

export interface EventData {
  id: string;
  title: string;
  period: string;
  description: string;
  highlight?: string;
  conditions: string[];
  badge?: string;
  color: string;
  active: boolean;
}

export const events: EventData[] = [
  {
    id: "late-checkout",
    title: "비수기 평일 12시 퇴실 이벤트",
    period: "퇴실 기준 월요일 ~ 금요일",
    description: "비수기 평일에는 다음날 12시까지 여유롭게 퇴실하실 수 있습니다.",
    highlight: "퇴실 12시",
    conditions: ["퇴실 기준 토요일~일요일, 휴일, 준성수기, 성수기는 제외됩니다.", "퇴실하실 때 방 열쇠는 관리실 앞 바구니에 반납 부탁드립니다."],
    badge: "평일", color: "#c8a97e", active: true,
  },
  {
    id: "weekday-2nights",
    title: "비수기 평일 연박 할인 이벤트",
    period: "입실 기준 월요일 ~ 수요일 · 2박 3일 · 휴일 ×",
    description: "펜션 직접 예약 시(041-675-1222) 비수기 평일 연박 2일째 객실 요금을 50% 할인해 드립니다.",
    highlight: "2일째 50% 할인",
    conditions: ["펜션 직접 예약(041-675-1222)에 한합니다.", "예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다."],
    badge: "연박", color: "#4f8a8b", active: true,
  },
  {
    id: "long-stay",
    title: "연박 할인 이벤트",
    period: "2박 이상",
    description: "펜션 직접 예약 시(041-675-1222) 객실 요금 2박 3일 15% / 3박 4일 ~ 4박 5일 20% / 5박 6일 이상 25% 할인됩니다.",
    highlight: "최대 25% 할인",
    conditions: ["펜션 직접 예약(041-675-1222)에 한합니다.", "예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다."],
    badge: "연박", color: "#4f8a8b", active: true,
  },
  {
    id: "winter-10",
    title: "동절기 평일 10% 객실 요금 할인 이벤트",
    period: "11월 ~ 3월 · 주중(일요일 ~ 목요일)",
    description: "동절기 주중(일~목) 예약 시 객실 요금 10% 할인 혜택을 드립니다.",
    highlight: "10% 할인",
    conditions: ["금요일 ~ 토요일, 휴일은 제외됩니다."],
    badge: "동절기", color: "#5b7db1", active: true,
  },
  {
    id: "revisit-gamtae",
    title: "재방문 이벤트 (감태)",
    period: "재방문 고객",
    description: "이원 감태 특산품은 회와 같이 드시면 맛있습니다. 다시 찾아주신 분께 이원 감태를 드립니다.",
    highlight: "이원 감태 증정",
    conditions: [],
    badge: "재방문", color: "#6f9a5b", active: true,
  },
];

export interface NoticeData {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  active: boolean;
}

// 공지사항 — 원본 게시판(board.php?bo_table=notice) 3건 + 메인 팝업 안내
export const notices: NoticeData[] = [
  {
    id: "popup-2026-09",
    title: "태안 숲속의바다펜션 안내 (입/퇴실시간, 브런치와 웰컴 무료, 할인, 이벤트)",
    date: "2026.09.08",
    important: true,
    active: true,
    content: `■ 입실 / 퇴실 시간 안내
[입실 시간] 오후 3시 이후, 연휴와 성수기는 오후 4시 이후
[퇴실 시간] 오전 11시 이전, 비수기 평일 12시 퇴실 이벤트 (퇴실 기준 월~금요일, 휴일 ×)
* 비수기와 준성수기는(연휴 ×) 유료 1만원 1시간 이내 조기 입실이 가능합니다.

■ 웰컴 서비스
컵라면, 과자, 음료, 생수(500ml) 중 1인당 1개씩 입실하실 때 숲속의바다 관리실 겸 매점에서 드립니다.

■ 브런치 무료 서비스 (샌드위치와 주스)
아침 9시쯤 완료 문자 드리면 9시 30분까지 숲속의바다 매점 겸 관리실에서 가져가신 후 객실이나 가시는 차 안에서 편하게 드시면 됩니다. (샌드위치와 주스 종류는 재료 수급 상황에 따라 변경될 수 있습니다.)

■ 비수기 평일 연박 할인 이벤트 (입실 기준 월요일~수요일 2박 3일, 휴일 ×)
(펜션 직접 예약 시 041-675-1222) 비수기 평일 연박 2일째 객실 요금 50% 할인해 드립니다.
* 예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다.

■ 연박 할인 이벤트
(펜션 직접 예약 시 041-675-1222) 객실 요금 2박 3일 15% / 3박 4일 ~ 4박 5일 20% / 5박 6일 이상 25% 할인됩니다.
* 예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다.

■ 동절기(11월~3월), 평일(일~목) 10% 객실 요금 할인 이벤트
금요일 ~ 토요일, 휴일은 제외됩니다.

■ 재방문 이벤트 (감태)
이원 감태 특산품은 회와 같이 드시면 맛있습니다.

■ 오션뷰 워터슬라이드 야외 수영장 운영 안내
6월 말부터 9월 초까지, 아침 10시~저녁 7시까지, 가로 20m, 세로 5m, 수심 1.2m
운영시간, 운영기간은 변경될 수 있습니다. 자세한 사항은 야외 수영장 공지를 참고하세요.`,
  },
  {
    id: "winter-discount",
    title: "동절기 (11월 ~ 3월), 주중 (일요일 ~ 목요일) 10% 객실 요금 할인 이벤트",
    date: "2025.11.18",
    important: false,
    active: true,
    content: `● 동절기 (11월 ~ 3월), 주중 (일요일 ~ 목요일) 10% 객실 요금 할인 이벤트 ●

(금요일 ~ 토요일, 휴일은 제외됩니다.)`,
  },
  {
    id: "late-checkout",
    title: "비수기 평일 12시까지 퇴실 이벤트 (퇴실 기준 월요일-금요일)",
    date: "2025.11.18",
    important: false,
    active: true,
    content: `● 비수기 평일 12시까지 퇴실 이벤트 (퇴실 기준 월요일-금요일) ●

- 성수기, 퇴실 기준 토요일 ~ 일요일, 휴일은 제외됩니다.
- 퇴실하실 때 방 열쇠는 관리실 앞에 있는 바구니에 반납 부탁드립니다.`,
  },
  {
    id: "pool-guide",
    title: "워터 슬라이드 야외 수영장 이용 안내",
    date: "2023.06.05",
    important: true,
    active: true,
    content: `● 워터 슬라이드 야외 수영장 이용 안내
▷ 운영 일자 : 6월 27일 ~ 8월 24일까지
▷ 운영 시간 : 10시 ~ 19시까지 (19시 ~ 10시까지 수영장 청소 시간)
▷ 수심 : 1.2m
▷ 복장 : 수영복

● 수영장 이용 시 유의사항
▷ 어린이는 반드시 보호자 동반 시 이용이 가능합니다.
▷ 아이들의 안전한 물놀이를 위해 보호자께서는 세심한 주의를 기울여 주시길 바랍니다.`,
  },
];

export const navItems = [
  { name: "소개", nameEn: "PROLOGUE", href: "#about" },
  { name: "객실", nameEn: "ROOMS", href: "#rooms" },
  { name: "특별함", nameEn: "SPECIAL", href: "#special" },
  { name: "여행", nameEn: "TOUR", href: "#tour" },
  { name: "오시는길", nameEn: "LOCATION", href: "#location" },
  { name: "이용안내", nameEn: "GUIDE", href: "#guide" },
  { name: "예약", nameEn: "RESERVATION", href: "#reservation" },
  { name: "공지", nameEn: "NOTICE", href: "#notice" },
];

export const formatPrice = (n: number) => n.toLocaleString("ko-KR") + "원";

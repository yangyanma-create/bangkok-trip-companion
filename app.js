import { FIREBASE_CONFIG, SYNC_ROOM_ID } from "./firebase-config.js";
import { GOOGLE_MAPS_EMBED_API_KEY } from "./maps-config.js";

const STORAGE_KEYS = {
  traveler: "bangkok-trip-traveler",
  expenses: "bangkok-trip-expenses",
  activeTab: "bangkok-trip-active-tab",
  selectedDayIndex: "bangkok-trip-selected-day-index",
  itineraryOverrides: "bangkok-trip-itinerary-overrides",
  dailyRoleDraws: "bangkok-trip-daily-role-draws",
  completedStops: "bangkok-trip-completed-stops",
  decisionVotes: "bangkok-trip-decision-votes",
  randomDecisionPicks: "bangkok-trip-random-decision-picks",
  customPlaces: "bangkok-trip-custom-places",
  deletedCandidatePlaces: "bangkok-trip-deleted-candidate-places",
  clientId: "bangkok-trip-client-id",
};

const BUDGET_LIMIT = 20000;
const BANGKOK_WEATHER = {
  latitude: 13.7563,
  longitude: 100.5018,
  label: "曼谷",
};

const dayPeriods = [
  { id: "morning", label: "早上" },
  { id: "afternoon", label: "下午" },
  { id: "evening", label: "晚上" },
];

const tripSettings = {
  hotel: {
    name: "學院旅館 College Haus.",
    address: "438/17 Chawakun Alley, Rangnam Rd, Thanon Phaya Thai, Ratchathewi, Bangkok 10400, Thailand",
    phone: "+66 83 279 1111",
    mapQuery: "College Haus 438/17 Chawakun Alley Rangnam Rd Ratchathewi Bangkok 10400 Thailand",
    note: "入住 2026/7/5 14:00 後，退房 2026/7/10 12:00 前。",
  },
  flights: {
    outbound: {
      code: "SL397",
      airline: "Thai Lion Air",
      route: "TPE → DMK",
      depart: "2026/7/5 16:40",
      arrive: "2026/7/5 19:30",
    },
    return: {
      code: "VZ568",
      airline: "Thai Vietjet Air",
      route: "BKK → TPE",
      depart: "2026/7/10 09:10",
      arrive: "2026/7/10 13:55",
    },
  },
};

const travelers = [
  { id: "a", name: "液蠔", color: "teal" },
  { id: "b", name: "🏠🍋", color: "lemon" },
  { id: "c", name: "疣法", color: "coral" },
  { id: "d", name: "🐎🐑", color: "violet" },
];

const roles = [
  { id: "decision", name: "決策者", description: "負責當天最終決定，包含行程、餐廳與候補點。" },
  { id: "bag", name: "背包人", description: "負責公共物品、票券、藥品和備用品。" },
  { id: "camera", name: "相機人", description: "負責拍照、記錄和整理旅行影像。" },
  { id: "ride", name: "叫車的", description: "負責 Grab、Bolt、計程車溝通與路線確認。" },
];

const googleRandomDecisionQueries = [
  { label: "熱門景點", query: "popular tourist attractions near me" },
  { label: "在地美食", query: "popular restaurants near me" },
  { label: "百貨商場", query: "shopping mall near me" },
  { label: "人氣商圈", query: "popular area near me" },
  { label: "夜市小吃", query: "night market street food near me" },
  { label: "咖啡甜點", query: "popular cafe dessert near me" },
  { label: "室內景點", query: "indoor attractions near me" },
  { label: "按摩放鬆", query: "thai massage near me" },
];

const starterSuggestionIds = new Set(["wat-arun", "iconsiam", "thai-massage"]);

const tripDays = [
  {
    date: "2026-07-05",
    label: "7/5 出發日",
    type: "flight",
    note: `${tripSettings.flights.outbound.code} ${tripSettings.flights.outbound.route}，${tripSettings.flights.outbound.depart} 起飛，${tripSettings.flights.outbound.arrive} 抵達。`,
    planned: ["airport-arrival", "hotel-checkin"],
    backups: ["nearby-night-market"],
  },
  {
    date: "2026-07-06",
    label: "7/6 主要遊玩日",
    type: "sightseeing",
    note: "正式行程待大家收集景點後排入。",
    planned: [],
    backups: ["wat-arun", "iconsiam", "thai-massage"],
  },
  {
    date: "2026-07-07",
    label: "7/7 主要遊玩日",
    type: "sightseeing",
    note: "可以安排文化景點、咖啡廳或購物區。",
    planned: [],
    backups: ["chatuchak", "jodd-fairs", "chinatown"],
  },
  {
    date: "2026-07-08",
    label: "7/8 主要遊玩日",
    type: "sightseeing",
    note: "保留給想去的活動或近郊行程。",
    planned: [],
    backups: ["ayutthaya", "river-dinner", "rooftop"],
  },
  {
    date: "2026-07-09",
    label: "7/9 主要遊玩日",
    type: "sightseeing",
    note: "回程前一天，適合購物、按摩與補買伴手禮。",
    planned: [],
    backups: ["central-world", "thai-massage", "chinatown"],
  },
  {
    date: "2026-07-10",
    label: "7/10 回程日",
    type: "flight",
    note: `${tripSettings.flights.return.code} ${tripSettings.flights.return.route}，${tripSettings.flights.return.depart} 起飛，${tripSettings.flights.return.arrive} 抵達。`,
    planned: ["hotel-checkout", "airport-departure"],
    backups: [],
  },
];

const places = [
  {
    id: "airport-arrival",
    name: `${tripSettings.flights.outbound.code} 抵達廊曼機場`,
    type: "航班",
    area: "DMK",
    period: "evening",
    duration: 90,
    cost: 300,
    priority: "必去",
    status: "預排",
    mapQuery: "Don Mueang International Airport, Bangkok, Thailand",
    note: `${tripSettings.flights.outbound.airline} ${tripSettings.flights.outbound.route}，${tripSettings.flights.outbound.depart} 起飛，${tripSettings.flights.outbound.arrive} 抵達。預估含入境、領行李與進市區交通。`,
  },
  {
    id: "hotel-checkin",
    name: `入住 ${tripSettings.hotel.name}`,
    type: "住宿周邊",
    area: "Ratchathewi",
    period: "evening",
    duration: 120,
    cost: 500,
    priority: "必去",
    status: "預排",
    mapQuery: tripSettings.hotel.mapQuery,
    note: `${tripSettings.hotel.note} 房東聯絡電話：${tripSettings.hotel.phone}。`,
  },
  {
    id: "hotel-checkout",
    name: `退房 ${tripSettings.hotel.name}`,
    type: "住宿周邊",
    area: "Ratchathewi",
    period: "morning",
    duration: 45,
    cost: 0,
    priority: "必去",
    status: "預排",
    mapQuery: tripSettings.hotel.mapQuery,
    note: "退房日 2026/7/10，需在 12:00 前退房；因早班機，建議清晨整理行李出發。",
  },
  {
    id: "airport-departure",
    name: `${tripSettings.flights.return.code} 前往素萬那普機場`,
    type: "航班",
    area: "BKK",
    period: "morning",
    duration: 150,
    cost: 350,
    priority: "必去",
    status: "預排",
    mapQuery: "Suvarnabhumi Airport, Bangkok, Thailand",
    note: `${tripSettings.flights.return.airline} ${tripSettings.flights.return.route}，${tripSettings.flights.return.depart} 起飛，${tripSettings.flights.return.arrive} 抵達。預留塞車、報到與退稅時間。`,
  },
  {
    id: "wat-arun",
    name: "鄭王廟 Wat Arun",
    type: "景點",
    area: "河畔",
    period: "morning",
    duration: 90,
    cost: 200,
    priority: "高",
    status: "候補",
    mapQuery: "Wat Arun, Bangkok, Thailand",
    note: "適合白天拍照，可搭船串河畔行程。",
  },
  {
    id: "iconsiam",
    name: "ICONSIAM",
    type: "購物",
    area: "河畔",
    period: "afternoon",
    duration: 180,
    cost: 1200,
    priority: "中",
    status: "候補",
    mapQuery: "ICONSIAM, Bangkok, Thailand",
    note: "逛街、吃飯、吹冷氣都方便。",
  },
  {
    id: "thai-massage",
    name: "泰式按摩",
    type: "活動",
    area: "依店家",
    period: "evening",
    duration: 120,
    cost: 900,
    priority: "高",
    status: "候補",
    mapQuery: "Thai massage, Bangkok, Thailand",
    note: "適合放在走很多路的晚上。",
  },
  {
    id: "chatuchak",
    name: "洽圖洽市集",
    type: "購物",
    area: "Chatuchak",
    period: "morning",
    duration: 210,
    cost: 1500,
    priority: "中",
    status: "候補",
    mapQuery: "Chatuchak Weekend Market, Bangkok, Thailand",
    note: "週末最完整，平日需確認店家狀況。",
  },
  {
    id: "jodd-fairs",
    name: "JODD FAIRS 夜市",
    type: "餐廳",
    area: "Rama 9",
    period: "evening",
    duration: 150,
    cost: 800,
    priority: "中",
    status: "候補",
    mapQuery: "JODD FAIRS Rama 9, Bangkok, Thailand",
    note: "適合晚餐與小吃集合。",
  },
  {
    id: "chinatown",
    name: "曼谷唐人街",
    type: "餐廳",
    area: "Yaowarat",
    period: "evening",
    duration: 180,
    cost: 1000,
    priority: "高",
    status: "候補",
    mapQuery: "Yaowarat Road, Bangkok, Thailand",
    note: "晚上氣氛好，適合美食路線。",
  },
  {
    id: "ayutthaya",
    name: "大城一日行程",
    type: "活動",
    area: "近郊",
    period: "morning",
    duration: 480,
    cost: 2500,
    priority: "中",
    status: "候補",
    mapQuery: "Ayutthaya Historical Park, Thailand",
    note: "需要較早出門，適合整天行程。",
  },
  {
    id: "river-dinner",
    name: "昭披耶河晚餐",
    type: "餐廳",
    area: "河畔",
    period: "evening",
    duration: 150,
    cost: 1800,
    priority: "低",
    status: "候補",
    mapQuery: "Chao Phraya River, Bangkok, Thailand",
    note: "預算較高，適合最後決策者評估。",
  },
  {
    id: "rooftop",
    name: "高空酒吧",
    type: "活動",
    area: "市中心",
    period: "evening",
    duration: 120,
    cost: 1800,
    priority: "低",
    status: "候補",
    mapQuery: "rooftop bar, Bangkok, Thailand",
    note: "注意服裝規定與天氣。",
  },
  {
    id: "central-world",
    name: "CentralWorld",
    type: "購物",
    area: "Siam",
    period: "afternoon",
    duration: 180,
    cost: 1500,
    priority: "中",
    status: "候補",
    mapQuery: "CentralWorld, Bangkok, Thailand",
    note: "伴手禮、餐廳、百貨集中。",
  },
  {
    id: "nearby-night-market",
    name: "飯店附近夜市或便利商店",
    type: "餐廳",
    area: "飯店附近",
    period: "evening",
    duration: 90,
    cost: 600,
    priority: "低",
    status: "候補",
    mapQuery: `night market near ${tripSettings.hotel.mapQuery}`,
    note: `抵達日不想跑遠時使用，以 ${tripSettings.hotel.name} 附近為主。`,
  },
];

const state = {
  travelerId: localStorage.getItem(STORAGE_KEYS.traveler),
  activeTab: normalizeActiveTab(localStorage.getItem(STORAGE_KEYS.activeTab) || "today"),
  selectedDayIndex: readSavedDayIndex(),
  editingExpenseId: null,
  syncedDailyRoleDraws: null,
  syncedItineraryOverrides: null,
  syncedCustomPlaces: null,
  syncedCompletedStops: null,
  syncedDecisionVotes: null,
  syncedRandomDecisionPicks: null,
  syncedDeletedCandidatePlaces: null,
  syncStatus: "本機模式",
  syncMessage: "尚未設定 Firebase，多人同步尚未啟用。",
  filters: {
    type: "全部",
    priority: "全部",
  },
  weather: {
    status: "loading",
    data: null,
    message: "讀取曼谷天氣中",
  },
};

const sync = {
  enabled: Boolean(FIREBASE_CONFIG?.apiKey && FIREBASE_CONFIG?.databaseURL),
  ready: false,
  database: null,
  databaseApi: null,
};

const setupView = document.querySelector("#setupView");
const mainView = document.querySelector("#mainView");
const travelerDrawGrid = document.querySelector("#travelerDrawGrid");
const randomDrawButton = document.querySelector("#randomDrawButton");
const syncBanner = document.querySelector("#syncBanner");
const travelerStatus = document.querySelector("#travelerStatus");
const tabPanel = document.querySelector("#tabPanel");
const bottomNav = document.querySelector("#bottomNav");
const resetTravelerButton = document.querySelector("#resetTravelerButton");

function money(amount) {
  return `NT$${Number(amount).toLocaleString("zh-TW")}`;
}

function minutesLabel(minutes) {
  if (minutes < 60) return `${minutes} 分鐘`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} 小時 ${rest} 分鐘` : `${hours} 小時`;
}

function weatherCodeLabel(code) {
  const labels = {
    0: "晴朗",
    1: "大致晴朗",
    2: "局部多雲",
    3: "多雲",
    45: "有霧",
    48: "霧霜",
    51: "毛毛雨",
    53: "毛毛雨",
    55: "毛毛雨",
    61: "小雨",
    63: "中雨",
    65: "大雨",
    80: "陣雨",
    81: "陣雨",
    82: "強陣雨",
    95: "雷雨",
    96: "雷雨",
    99: "雷雨",
  };
  return labels[code] || "天氣變化";
}

function weatherAdvice(weather) {
  if (!weather) return "抵達前再確認一次天氣。";
  if (weather.rainChance >= 60 || weather.precipitation > 0) return "可能有雨，帶傘比較穩。";
  if (weather.uvIndex >= 8) return "紫外線偏強，防曬補水。";
  if (weather.apparentTemperature >= 35) return "體感偏熱，排室內點休息。";
  return "天氣可行，注意補水。";
}

function nearestHourlyValue(times = [], values = [], currentTime) {
  if (!times.length || !values.length || !currentTime) return null;
  const currentHour = currentTime.slice(0, 13);
  const exactIndex = times.findIndex((time) => time.startsWith(currentHour));
  if (exactIndex >= 0) return values[exactIndex];

  const currentMs = new Date(currentTime).getTime();
  let nearestIndex = 0;
  let nearestDistance = Infinity;
  times.forEach((time, index) => {
    const distance = Math.abs(new Date(time).getTime() - currentMs);
    if (distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  });
  return values[nearestIndex] ?? null;
}

function getClientId() {
  let clientId = localStorage.getItem(STORAGE_KEYS.clientId);
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEYS.clientId, clientId);
  }
  return clientId;
}

const clientId = getClientId();

function getTraveler() {
  return travelers.find((traveler) => traveler.id === state.travelerId) || travelers[0];
}

function getSmokeRollTraveler(dayIndex) {
  return travelers[(dayIndex * 3 + 1) % travelers.length];
}

function getTodayIndex() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const exactIndex = tripDays.findIndex((day) => day.date === today);
  if (exactIndex >= 0) return exactIndex;
  if (today < tripDays[0].date) return 0;
  return tripDays.length - 1;
}

function readSavedDayIndex() {
  const savedIndex = Number(localStorage.getItem(STORAGE_KEYS.selectedDayIndex));
  if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < tripDays.length) {
    return savedIndex;
  }
  return getTodayIndex();
}

function getSelectedDayIndex() {
  if (Number.isInteger(state.selectedDayIndex) && state.selectedDayIndex >= 0 && state.selectedDayIndex < tripDays.length) {
    return state.selectedDayIndex;
  }
  return getTodayIndex();
}

function normalizeActiveTab(tabId) {
  const availableTabs = new Set(["today", "itinerary", "budget", "roles"]);
  if (tabId === "candidates") return "itinerary";
  return availableTabs.has(tabId) ? tabId : "today";
}

function setSelectedDayIndex(dayIndex) {
  const nextIndex = Number(dayIndex);
  if (!Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= tripDays.length) return;
  state.selectedDayIndex = nextIndex;
  localStorage.setItem(STORAGE_KEYS.selectedDayIndex, String(nextIndex));
  renderTravelerStatus();
  renderActiveTab();
}

function readCustomPlaces() {
  if (state.syncedCustomPlaces) {
    return state.syncedCustomPlaces;
  }

  return readJsonStorage(STORAGE_KEYS.customPlaces, []);
}

async function writeCustomPlaces(customPlaces) {
  writeJsonStorage(STORAGE_KEYS.customPlaces, customPlaces);
  if (!sync.ready) return;

  const { ref, set } = sync.databaseApi;
  await set(ref(sync.database, `rooms/${SYNC_ROOM_ID}/customPlaces`), customPlaces);
}

function readDeletedCandidatePlaces() {
  if (state.syncedDeletedCandidatePlaces) {
    return state.syncedDeletedCandidatePlaces;
  }

  return readJsonStorage(STORAGE_KEYS.deletedCandidatePlaces, []);
}

async function writeDeletedCandidatePlaces(placeIds) {
  const uniquePlaceIds = Array.from(new Set(placeIds));
  writeJsonStorage(STORAGE_KEYS.deletedCandidatePlaces, uniquePlaceIds);
  if (!sync.ready) return;

  const { ref, set } = sync.databaseApi;
  await set(ref(sync.database, `rooms/${SYNC_ROOM_ID}/deletedCandidatePlaces`), uniquePlaceIds);
}

function getAllPlaces() {
  return [...places, ...readCustomPlaces()];
}

function getPlace(id) {
  return getAllPlaces().find((place) => place.id === id);
}

function getPlaceMapQuery(place) {
  return place.mapQuery || `${place.name}, Bangkok, Thailand`;
}

function googleMapsSearchUrl(place) {
  const mapQuery = getPlaceMapQuery(place);
  if (/^https?:\/\//.test(mapQuery)) return mapQuery;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
}

function googleMapsNearbySearchUrl(place, keyword) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${keyword} near ${getPlaceMapQuery(place)}`)}`;
}

function googleMapsNearMeUrl(keyword) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${keyword} near me`)}`;
}

function googleMapsDirectionsUrl(routePlaces) {
  const validPlaces = routePlaces.filter(Boolean);
  if (validPlaces.length < 2) return "";

  const origin = encodeURIComponent(getPlaceMapQuery(validPlaces[0]));
  const destination = encodeURIComponent(getPlaceMapQuery(validPlaces[validPlaces.length - 1]));
  const waypoints = validPlaces
    .slice(1, -1)
    .map(getPlaceMapQuery)
    .map(encodeURIComponent)
    .join("|");
  const waypointParam = waypoints ? `&waypoints=${waypoints}` : "";

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointParam}&travelmode=driving`;
}

function googleMapsEmbedDirectionsUrl(routePlaces) {
  const validPlaces = routePlaces.filter(Boolean);
  if (!GOOGLE_MAPS_EMBED_API_KEY || validPlaces.length < 2) return "";

  const origin = encodeURIComponent(getPlaceMapQuery(validPlaces[0]));
  const destination = encodeURIComponent(getPlaceMapQuery(validPlaces[validPlaces.length - 1]));
  const waypoints = validPlaces
    .slice(1, -1)
    .map(getPlaceMapQuery)
    .map(encodeURIComponent)
    .join("|");
  const waypointParam = waypoints ? `&waypoints=${waypoints}` : "";

  return `https://www.google.com/maps/embed/v1/directions?key=${encodeURIComponent(GOOGLE_MAPS_EMBED_API_KEY)}&origin=${origin}&destination=${destination}${waypointParam}&mode=driving&language=zh-TW&region=TH`;
}

function getRole(roleId) {
  return roles.find((role) => role.id === roleId);
}

function readDailyRoleDraws() {
  if (state.syncedDailyRoleDraws) {
    return state.syncedDailyRoleDraws;
  }

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.dailyRoleDraws) || "{}");
  } catch {
    return {};
  }
}

function getDailyRoleAssignments(dayIndex) {
  const day = tripDays[dayIndex];
  const draws = readDailyRoleDraws();
  return draws[day.date] || {};
}

function getAssignedRoleForTraveler(travelerId, dayIndex) {
  return getRole(getDailyRoleAssignments(dayIndex)[travelerId]);
}

function getAvailableRoles(dayIndex, assignments = getDailyRoleAssignments(dayIndex)) {
  const usedRoleIds = new Set(Object.values(assignments).filter((value) => typeof value === "string"));
  return roles.filter((role) => !usedRoleIds.has(role.id));
}

function readItineraryOverrides() {
  if (state.syncedItineraryOverrides) {
    return state.syncedItineraryOverrides;
  }

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.itineraryOverrides) || "{}");
  } catch {
    return {};
  }
}

function readJsonStorage(key, fallback = {}) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readCompletedStops() {
  if (state.syncedCompletedStops) {
    return state.syncedCompletedStops;
  }

  return readJsonStorage(STORAGE_KEYS.completedStops, {});
}

async function writeCompletedStops(completedStops) {
  writeJsonStorage(STORAGE_KEYS.completedStops, completedStops);
  if (!sync.ready) return;

  const { ref, set } = sync.databaseApi;
  await set(ref(sync.database, `rooms/${SYNC_ROOM_ID}/completedStops`), completedStops);
}

function getCompletedStopIds(dayIndex) {
  const day = tripDays[dayIndex];
  const completedStops = readCompletedStops();
  return completedStops[day.date] || [];
}

function getNextPlaceForDay(dayIndex, plannedPlaces) {
  const completedIds = new Set(getCompletedStopIds(dayIndex));
  return plannedPlaces.find((place) => !completedIds.has(place.id)) || plannedPlaces[0] || null;
}

async function markStopCompleted(dayIndex, placeId) {
  const day = tripDays[dayIndex];
  const completedStops = readCompletedStops();
  const completedIds = new Set(completedStops[day.date] || []);
  completedIds.add(placeId);
  completedStops[day.date] = Array.from(completedIds);
  await writeCompletedStops(completedStops);
}

function readDecisionVotes() {
  if (state.syncedDecisionVotes) {
    return state.syncedDecisionVotes;
  }

  return readJsonStorage(STORAGE_KEYS.decisionVotes, {});
}

async function writeDecisionVotes(votes) {
  writeJsonStorage(STORAGE_KEYS.decisionVotes, votes);
  if (!sync.ready) return;

  const { ref, set } = sync.databaseApi;
  await set(ref(sync.database, `rooms/${SYNC_ROOM_ID}/decisionVotes`), votes);
}

function readRandomDecisionPicks() {
  if (state.syncedRandomDecisionPicks) {
    return state.syncedRandomDecisionPicks;
  }

  return readJsonStorage(STORAGE_KEYS.randomDecisionPicks, {});
}

async function writeRandomDecisionPicks(picks) {
  writeJsonStorage(STORAGE_KEYS.randomDecisionPicks, picks);
  if (!sync.ready) return;

  const { ref, set } = sync.databaseApi;
  await set(ref(sync.database, `rooms/${SYNC_ROOM_ID}/randomDecisionPicks`), picks);
}

async function toggleDecisionVote(dayIndex, placeId) {
  const traveler = getTraveler();
  const day = tripDays[dayIndex];
  const votes = readDecisionVotes();
  const dayVotes = votes[day.date] || {};
  const placeVotes = new Set(dayVotes[placeId] || []);

  if (placeVotes.has(traveler.id)) {
    placeVotes.delete(traveler.id);
  } else {
    placeVotes.add(traveler.id);
  }

  dayVotes[placeId] = Array.from(placeVotes);
  votes[day.date] = dayVotes;
  await writeDecisionVotes(votes);
}

async function setRandomDecisionPick(dayIndex, placeId) {
  const day = tripDays[dayIndex];
  const picks = readRandomDecisionPicks();
  picks[day.date] = placeId;
  await writeRandomDecisionPicks(picks);
}

function googleRandomPickUrl(pick) {
  return googleMapsNearMeUrl(pick.query || pick.label || "popular places");
}

function nameFromGoogleMapsLink(link) {
  try {
    const url = new URL(link);
    const placeMatch = url.pathname.match(/\/place\/([^/]+)/);
    if (placeMatch?.[1]) {
      return decodeURIComponent(placeMatch[1].replace(/\+/g, " ")).trim();
    }
    const query = url.searchParams.get("query") || url.searchParams.get("q");
    if (query) return query.trim();
  } catch {
    return "";
  }
  return "";
}

async function writeItineraryOverrides(overrides) {
  localStorage.setItem(STORAGE_KEYS.itineraryOverrides, JSON.stringify(overrides));
  if (!sync.ready) return;

  const { ref, set } = sync.databaseApi;
  await set(ref(sync.database, `rooms/${SYNC_ROOM_ID}/itineraryOverrides`), overrides);
}

function uniqueIds(ids) {
  return Array.from(new Set(ids));
}

function getDayPlan(dayIndex) {
  const day = tripDays[dayIndex];
  const overrides = readItineraryOverrides();
  const dayOverride = overrides[day.date] || { added: [], removed: [] };
  const added = dayOverride.added || [];
  const removed = dayOverride.removed || [];
  const periods = dayOverride.periods || {};
  const plannedIds = uniqueIds([...day.planned, ...added]).filter((id) => !removed.includes(id));
  const backupIds = uniqueIds([...day.backups, ...removed]).filter((id) => !plannedIds.includes(id));
  const withPeriodOverrides = (place) => ({
    ...place,
    period: periods[place.id] || place.period,
  });

  return {
    plannedIds,
    backupIds,
    plannedPlaces: plannedIds.map(getPlace).filter(Boolean).map(withPeriodOverrides),
    backupPlaces: backupIds.map(getPlace).filter(Boolean),
  };
}

async function updateTodayPlan(placeId, action, periodId) {
  const day = tripDays[getSelectedDayIndex()];
  const overrides = readItineraryOverrides();
  const current = overrides[day.date] || { added: [], removed: [], periods: {} };
  const added = new Set(current.added || []);
  const removed = new Set(current.removed || []);
  const periods = { ...(current.periods || {}) };

  if (action === "add") {
    added.add(placeId);
    removed.delete(placeId);
    if (dayPeriods.some((period) => period.id === periodId)) {
      periods[placeId] = periodId;
    }
  }

  if (action === "remove") {
    added.delete(placeId);
    removed.add(placeId);
    delete periods[placeId];
  }

  overrides[day.date] = {
    added: Array.from(added),
    removed: Array.from(removed),
    periods,
  };

  await writeItineraryOverrides(overrides);
}

function readExpenses() {
  try {
    const allExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses) || "{}");
    return allExpenses[state.travelerId] || [];
  } catch {
    return [];
  }
}

function writeExpenses(expenses) {
  const allExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses) || "{}");
  allExpenses[state.travelerId] = expenses;
  localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(allExpenses));
}

async function loadWeather() {
  const params = new URLSearchParams({
    latitude: String(BANGKOK_WEATHER.latitude),
    longitude: String(BANGKOK_WEATHER.longitude),
    current: "temperature_2m,apparent_temperature,precipitation,weather_code",
    hourly: "precipitation_probability,uv_index",
    forecast_days: "1",
    timezone: "Asia/Bangkok",
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
    const result = await response.json();
    const current = result.current || {};
    const hourly = result.hourly || {};
    const rainChance = nearestHourlyValue(hourly.time, hourly.precipitation_probability, current.time);
    const uvIndex = nearestHourlyValue(hourly.time, hourly.uv_index, current.time);

    state.weather = {
      status: "ready",
      data: {
        label: BANGKOK_WEATHER.label,
        temperature: Math.round(current.temperature_2m),
        apparentTemperature: Math.round(current.apparent_temperature),
        precipitation: Number(current.precipitation || 0),
        rainChance: Math.round(Number(rainChance || 0)),
        uvIndex: Math.round(Number(uvIndex || 0)),
        condition: weatherCodeLabel(current.weather_code),
        updatedAt: current.time,
      },
      message: "",
    };
  } catch (error) {
    console.error(error);
    state.weather = {
      status: "error",
      data: null,
      message: "天氣暫時讀不到",
    };
  }

  if (state.travelerId && state.activeTab === "today") {
    renderActiveTab();
  }
}

function render() {
  const hasTraveler = Boolean(state.travelerId);
  setupView.classList.toggle("is-hidden", hasTraveler);
  mainView.classList.toggle("is-hidden", !hasTraveler);
  bottomNav.classList.toggle("is-hidden", !hasTraveler);
  resetTravelerButton.classList.toggle("is-hidden", !hasTraveler);

  renderSyncBanner();
  renderTravelerDraw();
  if (hasTraveler) {
    renderTravelerStatus();
    renderActiveTab();
  }
}

function renderSyncBanner() {
  syncBanner.innerHTML = `
    <div class="sync-status ${sync.ready ? "online" : "local"}">
      <strong>${state.syncStatus}</strong>
      <span>${state.syncMessage}</span>
    </div>
  `;
}

function renderTravelerDraw() {
  travelerDrawGrid.innerHTML = travelers
    .map(
      (traveler, index) => {
        const selectedByMe = state.travelerId === traveler.id;
        const label = selectedByMe ? "這是我" : "選我";

        return `
        <button class="draw-card" type="button" data-traveler="${traveler.id}">
          <span>
            <strong>${traveler.name}</strong>
            <span>選擇後每天再抽今日角色 ${index + 1}</span>
          </span>
          <span class="pill ${traveler.color}">${label}</span>
        </button>
      `;
      },
    )
    .join("");
}

async function setTraveler(travelerId) {
  state.travelerId = travelerId;
  localStorage.setItem(STORAGE_KEYS.traveler, state.travelerId);
  render();
}

async function drawTodayRole() {
  if (!state.travelerId) return;

  const dayIndex = getSelectedDayIndex();
  const day = tripDays[dayIndex];
  const localDraws = readDailyRoleDraws();
  const currentAssignments = localDraws[day.date] || {};

  if (currentAssignments[state.travelerId]) {
    renderTravelerStatus();
    renderActiveTab();
    return;
  }

  if (!sync.ready) {
    const availableRoles = getAvailableRoles(dayIndex, currentAssignments);
    if (!availableRoles.length) {
      alert("今天的角色都已經被抽完了。");
      return;
    }

    const role = availableRoles[Math.floor(Math.random() * availableRoles.length)];
    localDraws[day.date] = {
      ...currentAssignments,
      [state.travelerId]: role.id,
    };
    localStorage.setItem(STORAGE_KEYS.dailyRoleDraws, JSON.stringify(localDraws));
    renderTravelerStatus();
    renderActiveTab();
    return;
  }

  const { ref, runTransaction } = sync.databaseApi;
  const dayDrawRef = ref(sync.database, `rooms/${SYNC_ROOM_ID}/dailyRoleDraws/${day.date}`);
  const result = await runTransaction(dayDrawRef, (assignments) => {
    const nextAssignments = assignments || {};
    if (nextAssignments[state.travelerId]) return nextAssignments;

    const availableRoles = getAvailableRoles(dayIndex, nextAssignments);
    if (!availableRoles.length) return undefined;

    const role = availableRoles[Math.floor(Math.random() * availableRoles.length)];
    return {
      ...nextAssignments,
      [state.travelerId]: role.id,
    };
  });

  if (!result.committed) {
    alert("今天的角色剛剛被抽完了。");
  }
}

function renderTravelerStatus() {
  const traveler = getTraveler();
  const dayIndex = getSelectedDayIndex();
  const role = getAssignedRoleForTraveler(traveler.id, dayIndex);
  const smokeRoll = getSmokeRollTraveler(dayIndex);
  const isSmokeRoll = smokeRoll.id === traveler.id;
  const showSmokeRoll = dayIndex === getTodayIndex();

  travelerStatus.innerHTML = `
    <div class="traveler-status-line">
      <strong>${traveler.name}</strong>
      <span class="pill ${traveler.color}">${role ? role.name : "今日未抽"}</span>
      <span class="pill">${tripDays[dayIndex].label}</span>
      ${showSmokeRoll ? `<span class="pill ${isSmokeRoll ? "gold" : ""}">${isSmokeRoll ? "你是今日煙捲" : `今日煙捲：${smokeRoll.name}`}</span>` : ""}
    </div>
    ${
      role
        ? ""
        : `<button class="draw-role-button" type="button" data-draw-today-role>抽今日角色</button>`
    }
  `;
}

function renderActiveTab() {
  state.activeTab = normalizeActiveTab(state.activeTab);
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
  });

  const renderers = {
    today: renderToday,
    itinerary: renderItinerary,
    budget: renderBudget,
    roles: renderRoles,
  };

  travelerStatus.classList.toggle("is-hidden", state.activeTab !== "today");
  tabPanel.classList.toggle("compact-tab-panel", state.activeTab !== "today");
  tabPanel.innerHTML = renderers[state.activeTab]();
  bindTabEvents();
}

async function setupSync() {
  if (!sync.enabled) {
    state.syncStatus = "本機模式";
    state.syncMessage = "貼上 Firebase config 後，角色、行程和候補才會多人同步。";
    return;
  }

  try {
    state.syncStatus = "連線中";
    state.syncMessage = "正在連接 Firebase 多人同步。";

    const [{ initializeApp }, databaseApi] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"),
    ]);

    const app = initializeApp(FIREBASE_CONFIG);
    sync.databaseApi = databaseApi;
    sync.database = databaseApi.getDatabase(app);
    sync.ready = true;

    state.syncStatus = "多人同步";
    state.syncMessage = "角色、行程、候補與完成狀態會同步給所有旅伴；預算保留個人本機。";

    const { ref, onValue } = databaseApi;
    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/dailyRoleDraws`), (snapshot) => {
      state.syncedDailyRoleDraws = snapshot.val() || {};
      localStorage.setItem(STORAGE_KEYS.dailyRoleDraws, JSON.stringify(state.syncedDailyRoleDraws));
      render();
    });

    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/itineraryOverrides`), (snapshot) => {
      state.syncedItineraryOverrides = snapshot.val() || {};
      localStorage.setItem(STORAGE_KEYS.itineraryOverrides, JSON.stringify(state.syncedItineraryOverrides));
      if (state.travelerId) {
        renderTravelerStatus();
        renderActiveTab();
      }
    });

    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/customPlaces`), (snapshot) => {
      state.syncedCustomPlaces = snapshot.val() || [];
      localStorage.setItem(STORAGE_KEYS.customPlaces, JSON.stringify(state.syncedCustomPlaces));
      if (state.travelerId) {
        renderActiveTab();
      }
    });

    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/deletedCandidatePlaces`), (snapshot) => {
      state.syncedDeletedCandidatePlaces = snapshot.val() || [];
      localStorage.setItem(STORAGE_KEYS.deletedCandidatePlaces, JSON.stringify(state.syncedDeletedCandidatePlaces));
      if (state.travelerId) {
        renderActiveTab();
      }
    });

    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/completedStops`), (snapshot) => {
      state.syncedCompletedStops = snapshot.val() || {};
      localStorage.setItem(STORAGE_KEYS.completedStops, JSON.stringify(state.syncedCompletedStops));
      if (state.travelerId) {
        renderActiveTab();
      }
    });

    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/decisionVotes`), (snapshot) => {
      state.syncedDecisionVotes = snapshot.val() || {};
      localStorage.setItem(STORAGE_KEYS.decisionVotes, JSON.stringify(state.syncedDecisionVotes));
      if (state.travelerId) {
        renderActiveTab();
      }
    });

    onValue(ref(sync.database, `rooms/${SYNC_ROOM_ID}/randomDecisionPicks`), (snapshot) => {
      state.syncedRandomDecisionPicks = snapshot.val() || {};
      localStorage.setItem(STORAGE_KEYS.randomDecisionPicks, JSON.stringify(state.syncedRandomDecisionPicks));
      if (state.travelerId) {
        renderActiveTab();
      }
    });
  } catch (error) {
    console.error(error);
    sync.ready = false;
    state.syncStatus = "同步失敗";
    state.syncMessage = "Firebase 連線失敗，暫時使用本機模式。";
  }
}

function placeCard(place, options = {}) {
  const addLabel = options.compactActions ? "加入" : "加入今日";
  const removeLabel = options.removeLabel || (options.compactActions ? "移除" : "從今日移除");
  const mapLabel = options.compactActions ? "地圖" : "開啟 Google Maps";
  const toneClass = options.featured ? placeToneClass(place) : "";
  const metaHtml = options.minimalMeta
    ? `<span class="meta">${place.type}</span>`
    : `
        <span class="meta">${place.type}</span>
        <span class="meta">${place.area}</span>
        <span class="meta">${minutesLabel(place.duration)}</span>
        <span class="meta">${money(place.cost)}</span>
        <span class="meta">優先度 ${place.priority}</span>
      `;
  const mapLinkHtml =
    options.hideMapLink
      ? ""
      : `<a class="map-link" href="${googleMapsSearchUrl(place)}" target="_blank" rel="noopener">${mapLabel}</a>`;
  const actionHtml =
    place.action === "add"
      ? `<button class="card-action add" type="button" data-add-today="${place.id}">${addLabel}</button>`
      : place.action === "remove"
        ? `<button class="card-action remove" type="button" data-remove-today="${place.id}">${removeLabel}</button>`
        : "";

  return `
    <article class="card ${options.featured ? "today-place-card" : ""} ${toneClass}">
      <div class="status-row">
        <h3>${place.name}</h3>
        ${options.hideStatus ? "" : `<span class="pill">${place.status}</span>`}
      </div>
      ${options.hideNote ? "" : `<p>${place.note}</p>`}
      ${options.hideMeta ? "" : `<div class="meta-row">${metaHtml}</div>`}
      <div class="place-actions ${options.compactActions ? "today-card-actions" : ""}">
        ${actionHtml}
        ${mapLinkHtml}
      </div>
    </article>
  `;
}

function compactPlaceCard(place) {
  const actionHtml =
    place.action === "add"
      ? `<button class="compact-action add" type="button" data-add-today="${place.id}">加入行程</button>`
      : place.action === "remove"
        ? `<button class="compact-action remove" type="button" data-remove-today="${place.id}">移除</button>`
        : "";
  const deleteHtml = `<button class="compact-action delete" type="button" data-delete-place="${place.id}" aria-label="刪除 ${place.name}">刪除</button>`;
  const metaParts = [place.type, place.id.startsWith("custom-") ? "" : place.area].filter(Boolean);

  return `
    <article class="compact-place-card">
      <div>
        <h3>${place.name}</h3>
        <div class="compact-meta">
          ${metaParts.map((part) => `<span>${part}</span>`).join("")}
        </div>
      </div>
      <div class="compact-actions">
        ${actionHtml}
        <a href="${googleMapsSearchUrl(place)}" target="_blank" rel="noopener" aria-label="在 Google Maps 開啟 ${place.name}">地圖</a>
        ${deleteHtml}
      </div>
    </article>
  `;
}

function placeToneClass(place) {
  const type = place.type || "";
  if (type.includes("餐")) return "tone-food";
  if (type.includes("購")) return "tone-shopping";
  if (type.includes("活動")) return "tone-activity";
  if (type.includes("景")) return "tone-sight";
  if (type.includes("航") || type.includes("交通")) return "tone-transit";
  if (type.includes("住宿")) return "tone-stay";
  return "tone-default";
}

function renderTodayMap(plannedPlaces) {
  if (plannedPlaces.length < 2) {
    return `
      <article class="card map-card">
        <div class="status-row">
          <h3>路線</h3>
          <span class="pill blue">Google Maps</span>
        </div>
        <p>2 個地點後產生路線。</p>
      </article>
    `;
  }

  const directionsUrl = googleMapsDirectionsUrl(plannedPlaces);
  const embedUrl = googleMapsEmbedDirectionsUrl(plannedPlaces);

  if (!embedUrl) {
    return `
      <article class="card map-card">
        <div class="status-row">
          <h3>路線</h3>
        </div>
        <p>使用外部 Google Maps。</p>
        <a class="map-button" href="${directionsUrl}" target="_blank" rel="noopener">開啟今日路線</a>
      </article>
    `;
  }

  return `
    <article class="card map-card">
      <div class="status-row">
        <h3>路線</h3>
        <span class="pill blue">自動更新</span>
      </div>
      <iframe
        class="route-map"
        title="今日路線地圖"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="${embedUrl}"
      ></iframe>
      <a class="map-button secondary" href="${directionsUrl}" target="_blank" rel="noopener">在 Google Maps 開啟</a>
    </article>
  `;
}

function getPeriodPlaces(placesForDay, periodId) {
  return placesForDay.filter((place) => place.period === periodId);
}

function renderTodayPeriod(period, plannedPlaces) {
  const periodPlaces = getPeriodPlaces(plannedPlaces, period.id);
  if (!periodPlaces.length) return "";

  return `
    <section class="today-period">
      <div class="place-list">
        ${
          periodPlaces
            .map((place) =>
              placeCard(
                { ...place, status: "今日", action: "remove" },
                { featured: true, hideNote: true, hideStatus: true, hideMeta: true, compactActions: true, minimalMeta: true },
              ),
            )
            .join("")
        }
      </div>
    </section>
  `;
}

function renderDaySwitcher(activeDayIndex) {
  return `
    <div class="day-switcher" aria-label="選擇查看日期">
      ${tripDays
        .map(
          (day, index) => `
            <button
              class="${index === activeDayIndex ? "is-active" : ""}"
              type="button"
              data-select-day="${index}"
              aria-pressed="${index === activeDayIndex ? "true" : "false"}"
            >
              <span>${day.label.split(" ")[0]}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderWeatherCard() {
  if (state.weather.status === "loading") {
    return `
      <article class="weather-card is-loading">
        <div>
          <p class="eyebrow">Weather</p>
          <h3>曼谷天氣</h3>
        </div>
        <span>讀取中</span>
      </article>
    `;
  }

  if (state.weather.status === "error" || !state.weather.data) {
    return `
      <article class="weather-card is-error">
        <div>
          <p class="eyebrow">Weather</p>
          <h3>曼谷天氣</h3>
        </div>
        <span>${state.weather.message}</span>
      </article>
    `;
  }

  const weather = state.weather.data;
  return `
    <article class="weather-card">
      <div class="weather-main">
        <div>
          <p class="eyebrow">Weather</p>
          <h3>${weather.label} ${weather.condition}</h3>
        </div>
        <strong>${weather.temperature}°</strong>
      </div>
      <div class="weather-metrics">
        <span>體感 ${weather.apparentTemperature}°</span>
        <span>降雨 ${weather.rainChance}%</span>
        <span>UV ${weather.uvIndex}</span>
      </div>
      <p>${weatherAdvice(weather)}</p>
    </article>
  `;
}

function renderTripSummary(dayIndex, plannedPlaces) {
  const day = tripDays[dayIndex];
  const nextPlace = getNextPlaceForDay(dayIndex, plannedPlaces);
  return `
    <article class="trip-summary-card">
      <div>
        <p class="eyebrow">${day.date}</p>
        <h2>${day.label}</h2>
        <p>${nextPlace ? `下一站：${nextPlace.name}` : day.note}</p>
      </div>
    </article>
  `;
}

function renderNextPlaceCard(dayIndex, plannedPlaces) {
  const nextPlace = getNextPlaceForDay(dayIndex, plannedPlaces);
  const completedCount = getCompletedStopIds(dayIndex).filter((placeId) => plannedPlaces.some((place) => place.id === placeId)).length;

  if (!nextPlace) {
    return `
      <article class="next-place-card">
        <p class="eyebrow">Next Stop</p>
        <h3>今天還沒排下一站</h3>
        <p>到行程頁從候補總覽加入行程。</p>
      </article>
    `;
  }

  return `
    <article class="next-place-card">
      <div>
        <p class="eyebrow">Next Stop</p>
        <h3>${nextPlace.name}</h3>
        <p>${completedCount}/${plannedPlaces.length} 已完成 · ${nextPlace.type}</p>
      </div>
      <div class="next-place-actions">
        <a href="${googleMapsSearchUrl(nextPlace)}" target="_blank" rel="noopener">前往</a>
        <button type="button" data-complete-stop="${nextPlace.id}">完成</button>
      </div>
    </article>
  `;
}

function renderTravelTools() {
  return `
    <section class="travel-tool-grid" aria-label="即時旅行工具">
      <a href="${googleMapsNearMeUrl("convenience store")}" target="_blank" rel="noopener">
        <span>附近</span>
        <strong>便利</strong>
      </a>
      <a href="${googleMapsNearMeUrl("restaurants")}" target="_blank" rel="noopener">
        <span>附近</span>
        <strong>美食</strong>
      </a>
      <a href="${googleMapsNearMeUrl("cannabis dispensary")}" target="_blank" rel="noopener">
        <span>附近</span>
        <strong>草本</strong>
      </a>
    </section>
  `;
}

function renderTodayInfoStack(dayIndex, plannedPlaces) {
  return `
    <section class="today-info-stack">
      ${renderWeatherCard()}
      ${renderNextPlaceCard(dayIndex, plannedPlaces)}
    </section>
  `;
}

function renderWeatherInline() {
  if (state.weather.status === "loading") {
    return `
      <div class="today-weather-inline">
        <span>曼谷天氣</span>
        <strong>讀取中</strong>
      </div>
    `;
  }

  if (state.weather.status === "error" || !state.weather.data) {
    return `
      <div class="today-weather-inline">
        <span>曼谷天氣</span>
        <strong>${state.weather.message}</strong>
      </div>
    `;
  }

  const weather = state.weather.data;
  return `
    <div class="today-weather-inline">
      <span>${weather.label} ${weather.condition}</span>
      <strong>${weather.temperature}°</strong>
      <small>體感 ${weather.apparentTemperature}° · 降雨 ${weather.rainChance}% · UV ${weather.uvIndex}</small>
    </div>
  `;
}

function renderTodayCommandCard(dayIndex, plannedPlaces) {
  const nextPlace = getNextPlaceForDay(dayIndex, plannedPlaces);
  const completedCount = getCompletedStopIds(dayIndex).filter((placeId) => plannedPlaces.some((place) => place.id === placeId)).length;

  return `
    <section class="today-command-card">
      <div class="today-next-block">
        <div class="today-next-label">
          <p>下一站</p>
          <span>${completedCount}/${plannedPlaces.length}</span>
        </div>
        <h3>${nextPlace ? nextPlace.name : "今天還沒排下一站"}</h3>
      </div>

      ${
        nextPlace
          ? `<div class="today-command-actions">
              <a href="${googleMapsSearchUrl(nextPlace)}" target="_blank" rel="noopener">前往</a>
              <button type="button" data-complete-stop="${nextPlace.id}">完成</button>
            </div>`
          : ""
      }

      <div class="today-utility-panel">
        ${renderWeatherInline()}
        ${renderTravelTools()}
      </div>
    </section>
  `;
}

function renderGoogleMapsPlaceTool() {
  return `
    <section class="google-place-card">
      <div>
        <p class="eyebrow">Google Maps</p>
        <h3>貼上店家連結</h3>
        <p>填入地點名稱並貼上 Google Maps 連結，加入候補行程總覽。</p>
      </div>
      <form class="google-place-form" id="googlePlaceForm">
        <label class="field google-place-name">
          <span>地點名稱</span>
          <input name="placeName" placeholder="例如 The One Ratchada" autocomplete="off" required />
        </label>
        <label class="field google-place-name">
          <span>Google Maps 連結</span>
          <input name="mapsLink" placeholder="貼上店家地址連結" autocomplete="off" required />
        </label>
        <div class="button-row">
          <a class="secondary-button google-place-search-link" href="${googleMapsNearMeUrl("popular places restaurants shopping mall attractions")}" target="_blank" rel="noopener">開啟地圖</a>
          <button class="primary-button" type="submit">加入候補</button>
        </div>
      </form>
    </section>
  `;
}

function renderToday() {
  const dayIndex = getSelectedDayIndex();
  const { plannedPlaces } = getDayPlan(dayIndex);
  const todayPlanHtml = dayPeriods.map((period) => renderTodayPeriod(period, plannedPlaces)).join("");

  return `
    <h2 class="section-title">今日</h2>
    ${renderDaySwitcher(dayIndex)}
    ${renderTodayCommandCard(dayIndex, plannedPlaces)}
    <section class="trip-sheet">
      <h2 class="section-title">今日行程</h2>
      <div class="today-period-list">
        ${todayPlanHtml || `<div class="empty-state compact-empty">今天還沒有排定行程。</div>`}
      </div>
    </section>
    ${renderTodayMap(plannedPlaces)}
  `;
}

function renderItinerary() {
  const dayIndex = getSelectedDayIndex();
  const day = tripDays[dayIndex];
  const { plannedIds, plannedPlaces } = getDayPlan(dayIndex);
  const plannedIdSet = new Set(plannedIds);
  const allPlaces = getAllPlaces();
  const deletedCandidateIds = new Set(readDeletedCandidatePlaces());
  const types = ["全部", ...Array.from(new Set(allPlaces.map((place) => place.type)))];
  const backupPlaces = allPlaces.filter((place) => {
    const typeMatch = state.filters.type === "全部" || place.type === state.filters.type;
    const shouldShowSuggestion = place.id.startsWith("custom-") || starterSuggestionIds.has(place.id);
    return shouldShowSuggestion && !deletedCandidateIds.has(place.id) && !plannedIdSet.has(place.id) && typeMatch;
  });

  return `
    <article class="card pass-card">
      <div class="status-row">
        <div>
          <p class="eyebrow">${day.type === "flight" ? "Flight" : "Explore"}</p>
          <h3>${day.label}</h3>
        </div>
        <span class="pill ${day.type === "flight" ? "blue" : "green"}">${day.type === "flight" ? "移動日" : "遊玩日"}</span>
      </div>
      <p>${day.note}</p>
    </article>
    ${renderDaySwitcher(dayIndex)}
    ${renderGoogleMapsPlaceTool()}
    <section class="trip-sheet backup-sheet">
      <h2 class="section-title secondary-title">候補行程總覽</h2>
      <div class="filters">
        <label class="field">
          <span>類型</span>
          <select id="typeFilter">
            ${types.map((type) => `<option value="${type}" ${type === state.filters.type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="compact-place-list">
        ${
          backupPlaces.length
            ? backupPlaces.map((place) => compactPlaceCard({ ...place, status: "候補", action: "add" })).join("")
            : `<div class="empty-state">目前沒有符合條件的候補地點。</div>`
        }
      </div>
    </section>
  `;
}

function renderCandidates() {
  return renderItinerary();
}

function renderBudget() {
  const expenses = readExpenses();
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const remaining = BUDGET_LIMIT - total;
  const percentage = Math.min(100, Math.round((total / BUDGET_LIMIT) * 100));
  const editingExpense = expenses.find((expense) => expense.id === state.editingExpenseId);

  return `
    <div class="page-heading">
      <p class="eyebrow">Budget</p>
      <h2 class="section-title">預算</h2>
    </div>
    <article class="card budget-summary-card">
      <div class="status-row">
        <div>
          <p class="eyebrow">每人預算</p>
          <h3>${money(BUDGET_LIMIT)}</h3>
        </div>
        <span class="pill ${remaining < 3000 ? "gold" : "green"}">剩 ${money(remaining)}</span>
      </div>
      <div class="meta-row">
        <span class="meta">已花 ${money(total)}</span>
        <span class="meta">使用 ${percentage}%</span>
      </div>
      <div class="budget-meter" aria-label="預算使用比例"><span style="width:${percentage}%"></span></div>
    </article>
    <form class="form-card expense-form-card" id="expenseForm">
      <h3>${editingExpense ? "修改支出" : "新增支出"}</h3>
      <div class="form-grid">
        <label class="field">
          <span>日期</span>
          <select name="date">
            ${tripDays.map((day) => `<option value="${day.date}" ${editingExpense?.date === day.date ? "selected" : ""}>${day.label}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>類別</span>
          <select name="category">
            ${["食物", "交通", "門票", "購物", "活動", "咖啡", "便利商店", "其他"]
              .map((category) => `<option value="${category}" ${editingExpense?.category === category ? "selected" : ""}>${category}</option>`)
              .join("")}
          </select>
        </label>
        <label class="field">
          <span>金額</span>
          <input name="amount" inputmode="decimal" placeholder="例如 350" value="${editingExpense?.amount || ""}" />
        </label>
        <label class="field">
          <span>地點</span>
          <input name="place" placeholder="可選填" value="${editingExpense?.place || ""}" />
        </label>
        <label class="field">
          <span>備註</span>
          <input name="note" placeholder="可選填" value="${editingExpense?.note || ""}" />
        </label>
        <div class="button-row">
          <button class="primary-button" type="submit">${editingExpense ? "儲存修改" : "加入支出"}</button>
          <button class="secondary-button" type="button" id="cancelExpenseButton">${editingExpense ? "取消修改" : "清空"}</button>
        </div>
      </div>
    </form>
    <div class="expense-list budget-list">
      ${expenses.length ? expenses.map(expenseCard).join("") : `<div class="empty-state">還沒有支出紀錄。旅途中每花一筆就記一下，預算會自己更新。</div>`}
    </div>
  `;
}

function expenseCard(expense) {
  return `
    <article class="card expense-card">
      <div class="expense-row">
        <div>
          <h3>${expense.category} ${money(expense.amount)}</h3>
          <p>${expense.date}${expense.place ? ` · ${expense.place}` : ""}${expense.note ? ` · ${expense.note}` : ""}</p>
        </div>
      </div>
      <div class="expense-actions">
        <button type="button" data-edit-expense="${expense.id}">修改</button>
        <button type="button" data-delete-expense="${expense.id}">刪除</button>
      </div>
    </article>
  `;
}

function renderRoles() {
  const dayIndex = getSelectedDayIndex();
  const day = tripDays[dayIndex];
  const smokeRoll = getSmokeRollTraveler(dayIndex);
  const showSmokeRoll = dayIndex === getTodayIndex();

  return `
    <div class="page-heading">
      <p class="eyebrow">Crew Roles</p>
      <h2 class="section-title">角色</h2>
    </div>
    ${renderDaySwitcher(dayIndex)}
    <div class="role-list">
      <article class="card roles-card">
        <div class="status-row">
          <div>
            <p class="eyebrow">${day.date}</p>
            <h3>${day.label}</h3>
          </div>
          ${showSmokeRoll ? `<span class="pill gold">煙捲：${smokeRoll.name}</span>` : ""}
        </div>
        <div class="place-list">
          ${travelers
            .map((traveler, travelerIndex) => {
              const role = getAssignedRoleForTraveler(traveler.id, dayIndex);
              return `
                <div class="role-assignment ${traveler.color}">
                  <span>${traveler.name}</span>
                  <strong>${role ? role.name : "未抽"}</strong>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>
    </div>
  `;
}

function bindTabEvents() {
  const typeFilter = document.querySelector("#typeFilter");
  const expenseForm = document.querySelector("#expenseForm");
  const googlePlaceForm = document.querySelector("#googlePlaceForm");
  const cancelExpenseButton = document.querySelector("#cancelExpenseButton");

  if (typeFilter) {
    typeFilter.addEventListener("change", (event) => {
      state.filters.type = event.target.value;
      renderActiveTab();
    });
  }

  if (expenseForm) {
    expenseForm.addEventListener("submit", handleExpenseSubmit);
  }

  if (googlePlaceForm) {
    googlePlaceForm.addEventListener("submit", handleGooglePlaceLinkSubmit);
  }

  if (cancelExpenseButton) {
    cancelExpenseButton.addEventListener("click", () => {
      state.editingExpenseId = null;
      expenseForm?.reset();
      renderActiveTab();
    });
  }

  document.querySelectorAll("[data-select-day]").forEach((button) => {
    button.addEventListener("click", () => {
      setSelectedDayIndex(Number(button.dataset.selectDay));
    });
  });

  document.querySelectorAll("[data-edit-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      state.editingExpenseId = button.dataset.editExpense;
      renderActiveTab();
    });
  });

  document.querySelectorAll("[data-delete-expense]").forEach((button) => {
    button.addEventListener("click", () => {
      const expenses = readExpenses().filter((expense) => expense.id !== button.dataset.deleteExpense);
      writeExpenses(expenses);
      renderActiveTab();
    });
  });

  document.querySelectorAll("[data-add-today]").forEach((button) => {
    button.addEventListener("click", async () => {
      await updateTodayPlan(button.dataset.addToday, "add", button.dataset.period);
      renderTravelerStatus();
      renderActiveTab();
    });
  });

  document.querySelectorAll("[data-remove-today]").forEach((button) => {
    button.addEventListener("click", async () => {
      await updateTodayPlan(button.dataset.removeToday, "remove");
      renderTravelerStatus();
      renderActiveTab();
    });
  });

  document.querySelectorAll("[data-delete-place]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteCandidatePlace(button.dataset.deletePlace);
      renderTravelerStatus();
      renderActiveTab();
    });
  });

  document.querySelectorAll("[data-complete-stop]").forEach((button) => {
    button.addEventListener("click", async () => {
      await markStopCompleted(getSelectedDayIndex(), button.dataset.completeStop);
      renderActiveTab();
    });
  });

  document.querySelectorAll("[data-draw-today-role]").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      button.textContent = "抽籤中...";
      await drawTodayRole();
      renderTravelerStatus();
      renderActiveTab();
    });
  });
}

function handleExpenseSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const amount = Number(formData.get("amount"));
  if (!Number.isFinite(amount) || amount <= 0) {
    alert("請輸入大於 0 的金額。");
    return;
  }

  const expenses = readExpenses();
  const nextExpense = {
    id: state.editingExpenseId || crypto.randomUUID(),
    date: formData.get("date"),
    category: formData.get("category"),
    amount,
    place: String(formData.get("place") || "").trim(),
    note: String(formData.get("note") || "").trim(),
    createdAt: new Date().toISOString(),
  };

  const nextExpenses = state.editingExpenseId
    ? expenses.map((expense) => (expense.id === state.editingExpenseId ? nextExpense : expense))
    : [nextExpense, ...expenses];

  writeExpenses(nextExpenses);
  state.editingExpenseId = null;
  renderActiveTab();
}

async function handleGooglePlaceLinkSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const typedPlaceName = String(formData.get("placeName") || "").trim();
  const mapsLink = String(formData.get("mapsLink") || "").trim();

  if (!typedPlaceName) {
    alert("請輸入地點名稱。");
    return;
  }

  if (!mapsLink) {
    alert("請貼上 Google Maps 店家地址連結。");
    return;
  }

  const customPlaces = readCustomPlaces();
  const placeName = typedPlaceName || nameFromGoogleMapsLink(mapsLink) || `Google Maps 地點 ${customPlaces.length + 1}`;
  const newPlace = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: placeName,
    type: "自訂",
    area: "Google Maps",
    period: "afternoon",
    duration: 90,
    cost: 0,
    priority: "自訂",
    status: "候補",
    mapQuery: mapsLink,
    note: "從 Google Maps 連結加入候補。",
  };

  await writeCustomPlaces([newPlace, ...customPlaces]);
  event.currentTarget.reset();
  renderActiveTab();
}

async function deleteCandidatePlace(placeId) {
  if (!placeId) return;

  if (placeId.startsWith("custom-")) {
    const nextCustomPlaces = readCustomPlaces().filter((place) => place.id !== placeId);
    await writeCustomPlaces(nextCustomPlaces);
  } else {
    const deletedCandidateIds = readDeletedCandidatePlaces();
    await writeDeletedCandidatePlaces([...deletedCandidateIds, placeId]);
  }

  const overrides = readItineraryOverrides();
  Object.keys(overrides).forEach((date) => {
    const dayOverride = overrides[date] || {};
    const periods = { ...(dayOverride.periods || {}) };
    delete periods[placeId];
    overrides[date] = {
      ...dayOverride,
      added: (dayOverride.added || []).filter((id) => id !== placeId),
      removed: (dayOverride.removed || []).filter((id) => id !== placeId),
      periods,
    };
  });
  await writeItineraryOverrides(overrides);
}

travelerDrawGrid.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-traveler]");
  if (!button) return;
  await setTraveler(button.dataset.traveler);
});

bottomNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  state.activeTab = normalizeActiveTab(button.dataset.tab);
  localStorage.setItem(STORAGE_KEYS.activeTab, state.activeTab);
  renderActiveTab();
});

resetTravelerButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEYS.traveler);
  state.travelerId = null;
  state.editingExpenseId = null;
  render();
});

await setupSync();
render();
loadWeather();

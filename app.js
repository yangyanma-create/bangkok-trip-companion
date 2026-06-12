const STORAGE_KEYS = {
  traveler: "bangkok-trip-traveler",
  expenses: "bangkok-trip-expenses",
  activeTab: "bangkok-trip-active-tab",
};

const BUDGET_LIMIT = 20000;

const travelers = [
  { id: "a", name: "旅伴 A", color: "green" },
  { id: "b", name: "旅伴 B", color: "blue" },
  { id: "c", name: "旅伴 C", color: "gold" },
  { id: "d", name: "旅伴 D", color: "green" },
];

const roles = [
  { id: "decision", name: "決策者", description: "負責當天最終決定，包含行程、餐廳與候補點。" },
  { id: "bag", name: "背包人", description: "負責公共物品、票券、藥品和備用品。" },
  { id: "camera", name: "相機人", description: "負責拍照、記錄和整理旅行影像。" },
  { id: "ride", name: "叫車的", description: "負責 Grab、Bolt、計程車溝通與路線確認。" },
];

const tripDays = [
  {
    date: "2026-07-05",
    label: "7/5 出發日",
    type: "flight",
    note: "搭飛機、抵達曼谷、入住與熟悉周邊。",
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
    note: "整理行李、前往機場、搭飛機回家。",
    planned: ["airport-departure"],
    backups: [],
  },
];

const places = [
  {
    id: "airport-arrival",
    name: "抵達曼谷機場",
    type: "交通",
    area: "機場",
    duration: 90,
    cost: 300,
    priority: "必去",
    status: "預排",
    note: "預估含入境、領行李與進市區交通。",
  },
  {
    id: "hotel-checkin",
    name: "入住飯店與周邊補給",
    type: "住宿周邊",
    area: "飯店附近",
    duration: 120,
    cost: 500,
    priority: "必去",
    status: "預排",
    note: "買水、SIM 或交通卡，確認集合點。",
  },
  {
    id: "airport-departure",
    name: "前往機場回程",
    type: "交通",
    area: "機場",
    duration: 150,
    cost: 350,
    priority: "必去",
    status: "預排",
    note: "預留塞車與退稅時間。",
  },
  {
    id: "wat-arun",
    name: "鄭王廟 Wat Arun",
    type: "景點",
    area: "河畔",
    duration: 90,
    cost: 200,
    priority: "高",
    status: "候補",
    note: "適合白天拍照，可搭船串河畔行程。",
  },
  {
    id: "iconsiam",
    name: "ICONSIAM",
    type: "購物",
    area: "河畔",
    duration: 180,
    cost: 1200,
    priority: "中",
    status: "候補",
    note: "逛街、吃飯、吹冷氣都方便。",
  },
  {
    id: "thai-massage",
    name: "泰式按摩",
    type: "活動",
    area: "依店家",
    duration: 120,
    cost: 900,
    priority: "高",
    status: "候補",
    note: "適合放在走很多路的晚上。",
  },
  {
    id: "chatuchak",
    name: "洽圖洽市集",
    type: "購物",
    area: "Chatuchak",
    duration: 210,
    cost: 1500,
    priority: "中",
    status: "候補",
    note: "週末最完整，平日需確認店家狀況。",
  },
  {
    id: "jodd-fairs",
    name: "JODD FAIRS 夜市",
    type: "餐廳",
    area: "Rama 9",
    duration: 150,
    cost: 800,
    priority: "中",
    status: "候補",
    note: "適合晚餐與小吃集合。",
  },
  {
    id: "chinatown",
    name: "曼谷唐人街",
    type: "餐廳",
    area: "Yaowarat",
    duration: 180,
    cost: 1000,
    priority: "高",
    status: "候補",
    note: "晚上氣氛好，適合美食路線。",
  },
  {
    id: "ayutthaya",
    name: "大城一日行程",
    type: "活動",
    area: "近郊",
    duration: 480,
    cost: 2500,
    priority: "中",
    status: "候補",
    note: "需要較早出門，適合整天行程。",
  },
  {
    id: "river-dinner",
    name: "昭披耶河晚餐",
    type: "餐廳",
    area: "河畔",
    duration: 150,
    cost: 1800,
    priority: "低",
    status: "候補",
    note: "預算較高，適合最後決策者評估。",
  },
  {
    id: "rooftop",
    name: "高空酒吧",
    type: "活動",
    area: "市中心",
    duration: 120,
    cost: 1800,
    priority: "低",
    status: "候補",
    note: "注意服裝規定與天氣。",
  },
  {
    id: "central-world",
    name: "CentralWorld",
    type: "購物",
    area: "Siam",
    duration: 180,
    cost: 1500,
    priority: "中",
    status: "候補",
    note: "伴手禮、餐廳、百貨集中。",
  },
  {
    id: "nearby-night-market",
    name: "飯店附近夜市或便利商店",
    type: "餐廳",
    area: "飯店附近",
    duration: 90,
    cost: 600,
    priority: "低",
    status: "候補",
    note: "抵達日不想跑遠時使用。",
  },
];

const state = {
  travelerId: localStorage.getItem(STORAGE_KEYS.traveler),
  activeTab: localStorage.getItem(STORAGE_KEYS.activeTab) || "today",
  editingExpenseId: null,
  filters: {
    type: "全部",
    priority: "全部",
  },
};

const setupView = document.querySelector("#setupView");
const mainView = document.querySelector("#mainView");
const travelerDrawGrid = document.querySelector("#travelerDrawGrid");
const randomDrawButton = document.querySelector("#randomDrawButton");
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

function getTraveler() {
  return travelers.find((traveler) => traveler.id === state.travelerId) || travelers[0];
}

function getRoleFor(dayIndex, travelerIndex) {
  return roles[(travelerIndex + dayIndex) % roles.length];
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

function getPlace(id) {
  return places.find((place) => place.id === id);
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

function render() {
  const hasTraveler = Boolean(state.travelerId);
  setupView.classList.toggle("is-hidden", hasTraveler);
  mainView.classList.toggle("is-hidden", !hasTraveler);
  bottomNav.classList.toggle("is-hidden", !hasTraveler);
  resetTravelerButton.classList.toggle("is-hidden", !hasTraveler);

  renderTravelerDraw();
  if (hasTraveler) {
    renderTravelerStatus();
    renderActiveTab();
  }
}

function renderTravelerDraw() {
  travelerDrawGrid.innerHTML = travelers
    .map(
      (traveler, index) => `
        <button class="draw-card" type="button" data-traveler="${traveler.id}">
          <span>
            <strong>${traveler.name}</strong>
            <span>抽到後會依日期輪替角色 ${index + 1}</span>
          </span>
          <span class="pill ${traveler.color}">抽這張</span>
        </button>
      `,
    )
    .join("");
}

function setTraveler(travelerId) {
  state.travelerId = travelerId;
  localStorage.setItem(STORAGE_KEYS.traveler, state.travelerId);
  render();
}

function renderTravelerStatus() {
  const traveler = getTraveler();
  const dayIndex = getTodayIndex();
  const travelerIndex = travelers.findIndex((item) => item.id === traveler.id);
  const role = getRoleFor(dayIndex, travelerIndex);
  const smokeRoll = getSmokeRollTraveler(dayIndex);
  const isSmokeRoll = smokeRoll.id === traveler.id;

  travelerStatus.innerHTML = `
    <div class="status-row">
      <div>
        <p class="eyebrow">你的身份</p>
        <h2>${traveler.name}</h2>
      </div>
      <span class="pill ${traveler.color}">${role.name}</span>
    </div>
    <div class="pill-row">
      <span class="pill">${tripDays[dayIndex].label}</span>
      <span class="pill ${isSmokeRoll ? "gold" : ""}">${isSmokeRoll ? "你是今日煙捲" : `今日煙捲：${smokeRoll.name}`}</span>
    </div>
  `;
}

function renderActiveTab() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
  });

  const renderers = {
    today: renderToday,
    itinerary: renderItinerary,
    candidates: renderCandidates,
    budget: renderBudget,
    roles: renderRoles,
  };

  tabPanel.innerHTML = renderers[state.activeTab]();
  bindTabEvents();
}

function placeCard(place) {
  return `
    <article class="card">
      <div class="status-row">
        <h3>${place.name}</h3>
        <span class="pill">${place.status}</span>
      </div>
      <p>${place.note}</p>
      <div class="meta-row">
        <span class="meta">${place.type}</span>
        <span class="meta">${place.area}</span>
        <span class="meta">${minutesLabel(place.duration)}</span>
        <span class="meta">${money(place.cost)}</span>
        <span class="meta">優先度 ${place.priority}</span>
      </div>
    </article>
  `;
}

function renderToday() {
  const dayIndex = getTodayIndex();
  const day = tripDays[dayIndex];
  const traveler = getTraveler();
  const travelerIndex = travelers.findIndex((item) => item.id === traveler.id);
  const role = getRoleFor(dayIndex, travelerIndex);
  const smokeRoll = getSmokeRollTraveler(dayIndex);
  const plannedPlaces = day.planned.map(getPlace).filter(Boolean);
  const backupPlaces = day.backups.map(getPlace).filter(Boolean);
  const dailyCost = [...plannedPlaces, ...backupPlaces].reduce((sum, place) => sum + place.cost, 0);

  return `
    <h2 class="section-title">今日</h2>
    <article class="card">
      <p class="eyebrow">${day.type === "flight" ? "移動日" : "主要遊玩日"}</p>
      <h3>${day.label}</h3>
      <p>${day.note}</p>
      <div class="pill-row">
        <span class="pill green">${role.name}</span>
        <span class="pill gold">煙捲：${smokeRoll.name}</span>
        <span class="pill blue">預估 ${money(dailyCost)}</span>
      </div>
    </article>
    <h2 class="section-title">預排行程</h2>
    <div class="place-list">
      ${plannedPlaces.length ? plannedPlaces.map(placeCard).join("") : `<div class="empty-state">這天還沒有排定正式行程，等大家收集完想去的地方後再放進來。</div>`}
    </div>
    <h2 class="section-title">候補選項</h2>
    <div class="place-list">
      ${backupPlaces.length ? backupPlaces.map(placeCard).join("") : `<div class="empty-state">這天暫時沒有候補地點。</div>`}
    </div>
  `;
}

function renderItinerary() {
  return `
    <h2 class="section-title">行程</h2>
    <div class="day-list">
      ${tripDays
        .map((day) => {
          const plannedPlaces = day.planned.map(getPlace).filter(Boolean);
          const backupPlaces = day.backups.map(getPlace).filter(Boolean);
          const estimatedCost = [...plannedPlaces, ...backupPlaces].reduce((sum, place) => sum + place.cost, 0);
          return `
            <article class="card">
              <div class="status-row">
                <div>
                  <p class="eyebrow">${day.type === "flight" ? "Flight" : "Explore"}</p>
                  <h3>${day.label}</h3>
                </div>
                <span class="pill ${day.type === "flight" ? "blue" : "green"}">${day.type === "flight" ? "移動日" : "遊玩日"}</span>
              </div>
              <p>${day.note}</p>
              <div class="meta-row">
                <span class="meta">預排 ${plannedPlaces.length} 個</span>
                <span class="meta">候補 ${backupPlaces.length} 個</span>
                <span class="meta">參考 ${money(estimatedCost)}</span>
              </div>
              <div class="place-list">
                ${plannedPlaces.map(placeCard).join("") || `<div class="empty-state">尚未排入正式景點。</div>`}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCandidates() {
  const types = ["全部", ...Array.from(new Set(places.map((place) => place.type)))];
  const priorities = ["全部", ...Array.from(new Set(places.map((place) => place.priority)))];
  const filteredPlaces = places.filter((place) => {
    const typeMatch = state.filters.type === "全部" || place.type === state.filters.type;
    const priorityMatch = state.filters.priority === "全部" || place.priority === state.filters.priority;
    return typeMatch && priorityMatch;
  });

  return `
    <h2 class="section-title">候補池</h2>
    <div class="filters">
      <label class="field">
        <span>類型</span>
        <select id="typeFilter">
          ${types.map((type) => `<option value="${type}" ${type === state.filters.type ? "selected" : ""}>${type}</option>`).join("")}
        </select>
      </label>
      <label class="field">
        <span>優先度</span>
        <select id="priorityFilter">
          ${priorities.map((priority) => `<option value="${priority}" ${priority === state.filters.priority ? "selected" : ""}>${priority}</option>`).join("")}
        </select>
      </label>
    </div>
    <div class="place-list">
      ${filteredPlaces.length ? filteredPlaces.map(placeCard).join("") : `<div class="empty-state">目前沒有符合條件的候補地點。</div>`}
    </div>
  `;
}

function renderBudget() {
  const expenses = readExpenses();
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const remaining = BUDGET_LIMIT - total;
  const percentage = Math.min(100, Math.round((total / BUDGET_LIMIT) * 100));
  const editingExpense = expenses.find((expense) => expense.id === state.editingExpenseId);

  return `
    <h2 class="section-title">我的預算</h2>
    <article class="card">
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
    <form class="form-card" id="expenseForm">
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
    <div class="expense-list">
      ${expenses.length ? expenses.map(expenseCard).join("") : `<div class="empty-state">還沒有支出紀錄。旅途中每花一筆就記一下，預算會自己更新。</div>`}
    </div>
  `;
}

function expenseCard(expense) {
  return `
    <article class="card">
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
  return `
    <h2 class="section-title">角色</h2>
    <div class="role-list">
      ${tripDays
        .map((day, dayIndex) => {
          const smokeRoll = getSmokeRollTraveler(dayIndex);
          return `
            <article class="card">
              <div class="status-row">
                <div>
                  <p class="eyebrow">${day.date}</p>
                  <h3>${day.label}</h3>
                </div>
                <span class="pill gold">煙捲：${smokeRoll.name}</span>
              </div>
              <div class="place-list">
                ${travelers
                  .map((traveler, travelerIndex) => {
                    const role = getRoleFor(dayIndex, travelerIndex);
                    return `
                      <div class="status-row">
                        <span>${traveler.name}</span>
                        <span class="pill ${traveler.color}">${role.name}</span>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function bindTabEvents() {
  const typeFilter = document.querySelector("#typeFilter");
  const priorityFilter = document.querySelector("#priorityFilter");
  const expenseForm = document.querySelector("#expenseForm");
  const cancelExpenseButton = document.querySelector("#cancelExpenseButton");

  if (typeFilter) {
    typeFilter.addEventListener("change", (event) => {
      state.filters.type = event.target.value;
      renderActiveTab();
    });
  }

  if (priorityFilter) {
    priorityFilter.addEventListener("change", (event) => {
      state.filters.priority = event.target.value;
      renderActiveTab();
    });
  }

  if (expenseForm) {
    expenseForm.addEventListener("submit", handleExpenseSubmit);
  }

  if (cancelExpenseButton) {
    cancelExpenseButton.addEventListener("click", () => {
      state.editingExpenseId = null;
      expenseForm?.reset();
      renderActiveTab();
    });
  }

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

travelerDrawGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-traveler]");
  if (!button) return;
  setTraveler(button.dataset.traveler);
});

randomDrawButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * travelers.length);
  setTraveler(travelers[randomIndex].id);
});

bottomNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  state.activeTab = button.dataset.tab;
  localStorage.setItem(STORAGE_KEYS.activeTab, state.activeTab);
  renderActiveTab();
});

resetTravelerButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEYS.traveler);
  state.travelerId = null;
  state.editingExpenseId = null;
  render();
});

render();

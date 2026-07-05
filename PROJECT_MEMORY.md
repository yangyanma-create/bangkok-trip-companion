# Bangkok Trip Companion 專案記憶

這個專案是給四位旅伴使用的曼谷五天四夜旅行小工具，日期是 2026/7/5 到 2026/7/10，其中 7/5 和 7/10 是搭飛機日。每個人預算是 NT$20,000，不包含機票和酒店。

## 專案位置

- 專案資料夾：`/Users/chiyangma/bangkok-trip-companion`
- 本機網址：`http://localhost:5173/`
- 啟動方式：在專案資料夾執行 `python3 -m http.server 5173`

## 目前完成的功能

- 手機優先的靜態網頁。
- 使用者進入後先選擇自己是誰。
- 四位旅伴名稱：
  - 液蠔
  - 🏠🍋
  - 疣法
  - 🐎🐑
- 每天可以抽今日角色，四個主要角色不重複：
  - 決策者
  - 背包人
  - 相機人
  - 叫車的
- 每天額外有一位「煙捲」。
- 角色頁只顯示當日角色分配。
- 每位旅伴顏色不同。
- 行程有預排行程和候補行程。
- 候補行程可以加入今日行程，也可以從今日行程刪除。
- 每個地點有預估停留時間和預估金額。
- 每個人有自己的預算頁，可以記錄支出、查看已花和剩餘金額。
- Firebase Realtime Database 已接上多人同步：
  - 每日角色抽籤同步
  - 今日行程加入/移除同步
  - 個人支出仍保存在自己的手機瀏覽器，不同步
- Google Maps 功能已加入：
  - 今日頁有「今日路線地圖」區塊
  - 今日行程改變時，路線會跟著更新
  - 每個地點都有「開啟 Google Maps」按鈕
  - 目前不顯示地點照片
  - 沒有 Google Maps Embed API key 時，顯示外部 Google Maps 路線按鈕
  - 有 API key 後，可以在頁面內嵌路線地圖
- 今日頁和角色頁已加入日期切換器：
  - 日期切換器目前顯示在行程頁和角色頁，不顯示在今日頁
  - 可以在旅行前手動查看 7/5 到 7/10 任一天
  - 抽角色、加入今日行程、移除今日行程都會套用到目前選取日期
  - 選取日期會保存在自己的瀏覽器 localStorage
- 今日頁已簡化成以「今日行程」為主：
  - 不再用「預排行程」作為今日頁主標題
  - 今日行程依早上、下午、晚上分段
  - 今日行程卡片維持主視覺
  - 今日行程卡片不顯示地點說明文字
  - 今日行程卡片下方資訊只保留景點分類，不顯示區域、時間、金額、優先度
  - 今日行程卡片的「移除」和「地圖」操作使用小按鈕
  - 今日行程卡片另有附近搜尋小按鈕：便利、美食、草本
  - 「草本」使用 Google Maps 關鍵字 `cannabis dispensary OR cannabis shop OR weed shop`
  - 今日行程上方有目前所在地附近快捷鍵：附近便利、附近美食、附近草本
  - 目前所在地附近快捷鍵使用 Google Maps `near me` 搜尋，不需要另外拿瀏覽器定位權限
  - 候補選項改成較小的 compact list，避免搶走今日行程重點
  - 候補選項加入今日時，可以直接選早上、下午、晚上
  - 加入時段會存在 Firebase/localStorage 的 `itineraryOverrides[date].periods`
  - 今日頁預估金額只計算已排入今日行程的地點，不包含候補
  - 今日摘要卡已移除，角色只在頂部旅伴狀態顯示
  - 煙捲只在選取真正今日時顯示，查看其他日期不顯示今日煙捲
- 2026-06-12 視覺已改成參考圖風格：
  - 深色背景與手機 app 感單欄版面
  - 亮黃色主操作、萊姆綠/黃色/紅色今日行程卡片
  - 大圓角卡片與深色候補小卡
  - 底部導覽改為浮動黑色膠囊，active tab 使用黃色高亮
- 2026-06-13 已調整非今日分頁密度：
  - 行程、候補、預算、角色分頁會套用 `compact-tab-panel`
  - 非今日分頁的卡片、標題、表單、按鈕、角色列表都縮小
  - 今日頁維持主視覺大卡，其他分頁作為次要工具頁呈現
- 今日頁已嵌入曼谷天氣卡：
  - 使用 Open-Meteo API，不需要 API key
  - 固定曼谷座標 `13.7563, 100.5018`
  - 顯示目前天氣、溫度、體感、降雨機率、UV 和簡短提醒
  - API 失敗時顯示「天氣暫時讀不到」，不影響其他功能
- 已補入實際航班與住宿資料：
  - 7/5 去程：Thai Lion Air SL397，TPE 16:40 → DMK 19:30
  - 7/10 回程：Thai Vietjet Air VZ568，BKK 09:10 → TPE 13:55
  - 住宿：學院旅館 College Haus.
  - 地址：438/17 Chawakun Alley, Rangnam Rd, Thanon Phaya Thai, Ratchathewi, Bangkok 10400, Thailand
  - 電話：+66 83 279 1111
  - 入住：2026/7/5 14:00 後；退房：2026/7/10 12:00 前
  - 訂位編號、PNR、票號、旅伴英文姓名不放入共享頁面，避免敏感資料外露
- 飯店地圖位置已集中在 `app.js` 的 `tripSettings.hotel`：
  - 目前 `mapQuery` 是 `College Haus 438/17 Chawakun Alley Rangnam Rd Ratchathewi Bangkok 10400 Thailand`
  - 若住宿有異動，改 `tripSettings.hotel` 即可套用到入住與飯店附近夜市路線
- 2026-06-15 UI 清理：
  - 行程卡片不要直接顯示住宿地址文字；地址只保留在 Google Maps 查詢用的 `mapQuery`
  - 今日行程每張卡片底部只保留「移除」按鈕
  - 不要在今日行程卡片底部顯示「地圖／便利／美食／草本」
  - 今日行程上方的「附近便利／附近美食／附近草本」快速搜尋列可以保留
- 2026-06-15 行程／候補結構調整：
  - 底部不再顯示「候補」分頁；候補內容歸到「行程」頁
  - 「行程」頁只顯示目前選取日期的當日行程，不再一次展開全部日期
  - 行程頁下方顯示「候補行程總覽」，候補項目可用早上／下午／晚上加入目前選取日期
  - 上方身份角色狀態卡只在「今日」頁顯示；行程、預算、角色頁都隱藏
  - 「今日」頁不再顯示下方候補選項，候補安排統一在行程頁操作
- 2026-06-15 視覺方向改為 B+D：
  - B：Bangkok Night Map HUD，夜間曼谷導航控制台感
  - D：Neon Bento 行程控制台，資訊清楚、卡片模組化、不過度裝飾
  - 使用深黑背景、細網格、掃描線、霓虹藍／旅費黃／粉紅危險色
  - 卡片保留高對比與可讀性，觸控按鈕至少維持接近 44px
  - 動畫只做輕量按壓、淡入和 hover/active 回饋，並支援 reduced-motion
- 2026-06-15 視覺方向再調整為 Apple Maps + Wallet Trip Companion：
  - 整體改成淺色 iOS 風格，重點是內容、清楚層級、原生 App 操作感
  - 今日頁新增旅程摘要卡，像 Apple Maps 的今日旅程入口
  - 早中晚行程放進 `trip-sheet`，模擬地圖 App 底部 sheet
  - 行程頁日期資訊改成 `pass-card`，帶一點 Apple Wallet 票卡感
  - 附近便利／美食／草本改成控制中心式快捷模組
  - 玻璃效果只用在導航、sheet、重點卡片，不再全頁霓虹裝飾
- 2026-06-15 新增旅行工具：
  - 今日頁新增「下一站模式」，自動抓當天第一個未完成行程，可開地圖或標記完成
  - 今日頁新增即時旅行工具列：下一站、住宿、叫車點、廁所、藥局、ATM
  - 今日頁新增旅伴決策工具：可從候補隨機抽點，也可用目前旅伴身份對候補投票
  - 完成狀態、投票、隨機抽選先存在 localStorage，之後若要多人同步可再接 Firebase
- 2026-06-15 工具列與分頁整理：
  - 今日即時工具列刪除「導航／移動／急用」三格
  - 工具列只保留「補給／吃飯／搜尋」三個兩字標籤，視覺一致
  - 行程、預算、角色頁新增 page heading 與專用卡片 class，維持 Apple 風格一致
  - 預算頁摘要、表單、支出列表更緊湊；角色頁分工名單更像清楚的 crew sheet
- 2026-06-15 Google Maps 隨機決策：
  - 天氣下方只保留一組快捷列：便利、美食、草本
  - 「不知道去哪？」改為從 Google Maps 搜尋主題隨機抽：熱門景點、在地美食、百貨商場、人氣商圈、夜市小吃、咖啡甜點、室內景點、按摩放鬆
  - 抽到後顯示「開啟 Google Maps」按鈕，直接用 near me 搜尋
- 2026-07-04 部署前新增：
  - 行程頁新增「從地圖加入行程」工具
  - 可輸入 Google Maps 上看到的景點、店名或百貨公司，選類型與早中晚後直接加入目前選取日期
  - 「搜尋地圖」會用 Google Maps 搜尋輸入文字；「加入行程」會建立自訂景點並加入行程
  - 自訂景點存在 localStorage `bangkok-trip-custom-places`，可跟一般行程一樣開 Google Maps、移除
- 2026-07-04 出發前簡化：
  - 所有候補卡不再顯示早上／下午／晚上，統一只留「加入行程」
  - Google Maps 小卡移除地點名稱、類型、時段表單，只保留「開啟 Google Maps」搜尋入口
  - 今日頁順序改為天氣在 Next Stop 上方
  - 今日頁移除「不知道去哪？」抽地點小卡
  - 今日行程小卡縮小；預設候補只保留 Wat Arun、ICONSIAM、泰式按摩三個
- 2026-07-04 最終版面調整：
  - 今日頁身份角色卡縮小為單行顯示
  - 今日頁天氣與 Next Stop 合併在同一組資訊堆疊，天氣在上
  - 今日摘要卡移除「幾個行程／移動日」等底部備註
  - 行程頁移除上方「行程」標題，改用當天日期票卡作為標題
  - 行程頁移除「當日行程」區塊，只保留 Google Maps 連結工具與候補行程總覽
  - Google Maps 小卡可貼上店家地址連結，送出後加入候補總覽
- 2026-07-04 同步範圍確認：
  - 預算支出維持個人手機本機資料，不同步給其他旅伴
  - 除預算外的旅行決策都要同步：每日角色、7/5 到 7/10 各日期行程加入/移除、自訂 Google Maps 候補、Next Stop 完成狀態、旅伴投票與隨機抽選結果
  - 自訂候補地點會寫入 Firebase `rooms/{SYNC_ROOM_ID}/customPlaces`，所有日期頁共享候補池；加入行程時仍依目前選取日期寫入 `itineraryOverrides[date]`
  - 今日頁也顯示 7/5 到 7/10 日期切換器，讓旅伴可以直接點進任一天查看與操作；選取日期仍只存在個人瀏覽器
- 2026-07-04 今日頁清晰化：
  - 日期切換按鈕只顯示 7/5 到 7/10，不再顯示「移動／遊玩」
  - 今日頁合併下一站、天氣、附近便利／美食／草本成同一張主控卡，減少小卡分散造成的混亂
  - 今日行程改成白底清楚列表，文字層級固定，主要行動用藍色，完成狀態用綠色，移除用淡紅色
  - 今日主控卡刪除日期與「出發日／主要遊玩日」標題；下一站下方不再顯示地點類別
  - 今日行程刪除早上／下午／晚上分段文字與每張卡的「今日」狀態標籤，並縮小行程小卡高度
  - 今日行程小卡改成單排緊湊樣式，使用淡底色和左側色條區分景點／購物／餐廳／活動／交通／住宿
  - 行程頁候補總覽刪除優先度篩選；候補地點只顯示類型與區域，不顯示預估時間與金額
  - Google Maps 候補加入表單新增必填「地點名稱」，避免短連結加入後只顯示籠統名稱
  - 候補總覽中的自訂 Google Maps 地點會顯示「刪除」鍵；刪除後同步移除自訂候補並清掉各日期行程覆寫中的該地點
  - 候補總覽所有地點都顯示「刪除」鍵；內建候補刪除後寫入同步隱藏清單 `deletedCandidatePlaces`
  - 自訂 Google Maps 地點在候補卡下方只顯示「自訂」，不再顯示「Google Maps」區域文字
- 2026-07-05 上架後錯誤修正：
  - 今日路線串接改用乾淨地點文字 `getPlaceDirectionsQuery()`，避免自訂 Google Maps 長連結被 directions 解析成錯誤地址
  - 今日只有 1 個行程地點時，路線卡改成「開啟地點位置」，2 個以上才產生今日路線
  - Firebase `dailyRoleDraws` 已清空，正式上架後 7/5 到 7/10 全部回到未抽狀態
  - 角色同步回來時只刷新旅伴狀態與目前頁面，不再整個 app 重跑，避免看起來像所有日期一起重抽
- 2026-07-05 今日路線短連結修正：
  - 自訂地點新增 `directionsQuery`，今日路線優先使用這個欄位，不再把 `maps.app.goo.gl` 短連結塞進 Google Maps directions
  - 若 `mapQuery` 是完整 Google Maps URL，會嘗試讀取 URL 裡的 `q` 或 `query` 作為路線地址
  - 已把 Firebase 現有自訂地點的短連結解析成完整地址，包含醫院對面、廊曼國際機場、旅館
  - 行程頁每張卡的「地圖」按鈕也改用 `directionsQuery` 產生乾淨 Google Maps search URL，不再直接開短連結或複雜 Maps URL
  - 新增自訂地點時，原始 Google Maps 連結保存到 `sourceMapUrl`，`mapQuery` 改存地點名稱搜尋文字，降低 Google Maps Web 版解析錯誤

## Firebase 設定

Firebase config 在 `firebase-config.js`。

目前使用：

- Project ID：`bangkok-trip-companion`
- Realtime Database URL：`https://bangkok-trip-companion-default-rtdb.firebaseio.com/`
- Sync room ID：`bangkok-trip-2026`

目前測試用 Database rules：

```json
{
  "rules": {
    "rooms": {
      "bangkok-trip-2026": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

這份規則適合朋友測試，公開使用前要改成更嚴格的規則。

## Google Maps 設定

Google Maps API key 放在 `maps-config.js`：

```js
export const GOOGLE_MAPS_EMBED_API_KEY = "";
```

如果之後要內嵌地圖，把 key 貼進空字串即可。沒有 key 也可以正常使用外部 Google Maps 路線。

## 重要檔案

- `index.html`：頁面骨架
- `styles.css`：手機版樣式
- `app.js`：主要功能、角色抽籤、行程、預算、Google Maps
- `firebase-config.js`：Firebase 設定
- `maps-config.js`：Google Maps Embed API key
- `README.md`：使用說明
- `PROJECT_MEMORY.md`：這份專案記憶
- `docs/superpowers/specs/2026-06-12-曼谷旅伴行程小工具規格.md`：原始規格
- `docs/superpowers/plans/2026-06-12-曼谷旅伴行程小工具實作計畫.md`：實作計畫

## 最近提交紀錄

- `71dd435 Add Google Maps route links`
- `b945c80 Change setup to person selection and daily role draw`
- `ffa5083 Configure Firebase realtime database`
- `96f53ed Add Firebase multiplayer sync scaffold`
- `9a18b2b Update roles and today itinerary actions`
- `528ca64 Build first version of Bangkok trip companion`

## 下一個聊天室可以接著做的事

- 如果要真的內嵌地圖，建立 Google Maps Embed API key，貼到 `maps-config.js`。
- 飯店地址已補上；若住宿有異動，再更新 `app.js` 的 `tripSettings.hotel`。
- 若要正式測試旅行日期，先在今日頁切到指定日期，再抽角色或調整今日行程。
- 等大家收集完想去的景點、餐廳、活動後，把候補池和每日預排行程改成正式版。
- 若要公開給朋友用，可以把 Firebase Database rules 改安全一點。
- 若要部署到網路，可以用 GitHub Pages、Firebase Hosting 或 Netlify。

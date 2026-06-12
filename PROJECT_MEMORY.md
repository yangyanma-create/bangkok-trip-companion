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
- 補上真實飯店地址，讓飯店和附近夜市路線更準。
- 等大家收集完想去的景點、餐廳、活動後，把候補池和每日預排行程改成正式版。
- 若要公開給朋友用，可以把 Firebase Database rules 改安全一點。
- 若要部署到網路，可以用 GitHub Pages、Firebase Hosting 或 Netlify。

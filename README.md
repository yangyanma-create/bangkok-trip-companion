# 曼谷旅伴行程小工具

這是一個手機優先的曼谷旅遊網頁小工具，給四位旅伴使用。

## 這個工具要做什麼

- 打開連結後，每個人先抽出自己的旅伴身份。
- 設定 Firebase 後，四個人抽身份不會重複。
- 四位旅伴身份是：液蠔、🏠🍋、疣法、🐎🐑。
- 每天會輪替四個角色：決策者、背包人、相機人、叫車的。
- 每天會額外隨機抽一位成為「煙捲」，負責氣氛補給、提醒休息、補水零食和歌單。
- 可以看 2026/7/5 到 2026/7/10 的曼谷行程。
- 可以看每個地點預估會停留多久、預估會花多少錢。
- 候補行程可以加入今日行程，也可以從今日行程移除；設定 Firebase 後會同步給所有人。
- 每個人有自己的預算頁，記錄自己花了多少、還剩多少。
- 每人預算是 NT$20,000，不包含機票和酒店。

## 第一版先做什麼

目前版本可以接 Firebase 做多人同步。每個人的花費紀錄仍然存在自己的手機瀏覽器裡，不會同步給其他人。

## 怎麼打開

請在這個資料夾啟動本機伺服器：

```bash
python3 -m http.server 5173
```

啟動後打開：

```text
http://localhost:5173
```

## 多人同步設定

多人同步使用 Firebase Realtime Database。還沒貼上 Firebase config 時，網頁會顯示「本機模式」，仍然可以單機使用。

把 Firebase Web app config 貼到 `firebase-config.js`：

```js
export const FIREBASE_CONFIG = {
  apiKey: "你的 apiKey",
  authDomain: "你的專案.firebaseapp.com",
  databaseURL: "https://你的專案-default-rtdb.firebaseio.com",
  projectId: "你的專案",
  storageBucket: "你的專案.appspot.com",
  messagingSenderId: "你的 messagingSenderId",
  appId: "你的 appId",
};

export const SYNC_ROOM_ID = "bangkok-trip-2026";
```

Firebase Realtime Database 規則可以先用這份簡單版本：

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

這份規則適合朋友小工具測試；正式公開連結前應改成更嚴格的規則。

## 目前狀態

已完成多人同步版靜態網頁：

- `index.html`
- `styles.css`
- `app.js`
- `firebase-config.js`

請先看這份規格：

- `docs/superpowers/specs/2026-06-12-曼谷旅伴行程小工具規格.md`

實作計畫在這裡：

- `docs/superpowers/plans/2026-06-12-曼谷旅伴行程小工具實作計畫.md`

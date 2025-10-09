# 🔍 手動提取 Google Forms 欄位名稱

由於自動腳本無法正確識別所有欄位，我們需要手動提取。

---

## 📋 手動提取步驟

### 步驟 1: 開啟 Google Forms
訪問：https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform

### 步驟 2: 開啟網頁原始碼
- **Windows**: 按 `Ctrl + U`
- **Mac**: 按 `Cmd + Option + U`
- **或右鍵 → 查看網頁原始碼**

### 步驟 3: 搜尋欄位名稱
1. 在原始碼頁面按 `Ctrl + F` (Windows) 或 `Cmd + F` (Mac)
2. 搜尋：`entry.`
3. 會找到很多 `entry.XXXXXXXXXX` 的項目

### 步驟 4: 識別實際表單欄位

在搜尋結果中，找到以下格式的欄位（不是 `_sentinel` 結尾的）：

```
<input name="entry.XXXXXXXXXX" ...>
<textarea name="entry.XXXXXXXXXX" ...>
<select name="entry.XXXXXXXXXX" ...>
```

**需要找到 8 個欄位**（按表單順序）：

1. **公司名稱** - 通常是第一個文字輸入框
2. **聯絡人姓名** - 第二個文字輸入框
3. **電子信箱** - email 類型的輸入框
4. **聯絡電話** - tel 類型的輸入框
5. **感興趣的服務** - 複選框（checkbox）
6. **預算範圍** - 下拉選單（select）
7. **期望完成時間** - 下拉選單（select）
8. **詳細需求描述** - 文字區域（textarea）

---

## 🎯 快速識別方法

### 方法 1: 根據 HTML 結構識別

在原始碼中找到類似這樣的結構：

```html
<!-- 公司名稱 -->
<input name="entry.123456789" type="text" ...>

<!-- 聯絡人姓名 -->
<input name="entry.234567890" type="text" ...>

<!-- 電子信箱 -->
<input name="entry.345678901" type="email" ...>

<!-- 聯絡電話 -->
<input name="entry.456789012" type="tel" ...>

<!-- 感興趣的服務 (複選框) -->
<input name="entry.567890123" type="checkbox" value="LLM強化 AI Line Bot" ...>
<input name="entry.567890123" type="checkbox" value="智能客服機器人" ...>
<!-- 注意：複選框會有相同的 entry 名稱，但不同的 value -->

<!-- 預算範圍 (下拉選單) -->
<select name="entry.678901234" ...>
    <option value="10萬以下">10萬以下</option>
    ...
</select>

<!-- 期望完成時間 (下拉選單) -->
<select name="entry.789012345" ...>
    <option value="1個月內">1個月內</option>
    ...
</select>

<!-- 詳細需求描述 (文字區域) -->
<textarea name="entry.890123456" ...></textarea>
```

### 方法 2: 使用瀏覽器開發者工具

1. 按 `F12` 開啟開發者工具
2. 點擊「Elements」或「元素」標籤
3. 按 `Ctrl + F` 搜尋 `entry.`
4. 依序找到 8 個實際的欄位（不是 `_sentinel`）

---

## 📝 記錄欄位名稱

請按照以下格式記錄找到的欄位名稱：

```
公司名稱: entry.123456789
聯絡人姓名: entry.234567890
電子信箱: entry.345678901
聯絡電話: entry.456789012
感興趣的服務: entry.567890123
預算範圍: entry.678901234
期望完成時間: entry.789012345
詳細需求描述: entry.890123456
```

**注意：** 請將上面的 `entry.XXXXXXXXXX` 替換為您實際找到的欄位名稱。

---

## 🚀 找到後該怎麼做

將找到的 8 個欄位名稱告訴我，我會立即更新系統代碼，讓表單能正確提交到 Google Forms！

---

## 💡 提示

1. **複選框特殊處理**：感興趣的服務是複選框，所有選項都使用相同的 `entry.XXXXXXXXXX` 名稱
2. **順序很重要**：請按照表單的顯示順序記錄欄位
3. **過濾 sentinel**：忽略所有以 `_sentinel` 結尾的欄位
4. **實際欄位**：只記錄實際的 input、textarea、select 欄位

---

## ❓ 如果還是找不到

如果您在原始碼中找不到這些欄位，可能的原因：

1. **表單尚未完全載入** - 請重新整理頁面
2. **需要登入 Google 帳號** - 請先登入
3. **表單結構複雜** - 請截圖原始碼的相關部分

請告訴我您遇到的具體情況，我會提供其他解決方案！

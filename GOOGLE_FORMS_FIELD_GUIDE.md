# 🔍 Google Forms 欄位名稱獲取指南

## 目標表單
https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform

---

## 📋 快速獲取欄位名稱的方法

### 方法 1: 使用瀏覽器開發者工具（最準確）

1. **開啟 Google Forms**
   - 訪問：https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform

2. **開啟開發者工具**
   - 按 `F12` 或 `右鍵 → 檢查`

3. **切換到 Elements 標籤**
   - 在開發者工具中選擇「Elements」或「元素」標籤

4. **搜尋欄位**
   - 按 `Ctrl+F` (Windows) 或 `Cmd+F` (Mac)
   - 搜尋：`entry.`

5. **找到所有 entry 欄位**
   - 依序找到 8 個欄位的 `name="entry.XXXXXXXXXX"` 屬性
   - 按照表單順序記錄下來

---

## 📝 欄位對應表（請填寫）

請按照表單順序填寫找到的 entry 欄位名稱：

```
1. 公司名稱:          entry._____________
2. 聯絡人姓名:        entry._____________
3. 電子信箱:          entry._____________
4. 聯絡電話:          entry._____________
5. 感興趣的服務:      entry._____________
6. 預算範圍:          entry._____________
7. 期望完成時間:      entry._____________
8. 詳細需求描述:      entry._____________
```

---

## 🔍 詳細步驟說明

### 步驟 1: 找到「公司名稱」欄位

1. 在 Google Forms 頁面上，找到「公司名稱」輸入框
2. 在開發者工具中，點擊「選擇元素」工具（箭頭圖示）
3. 點擊「公司名稱」輸入框
4. 在 Elements 標籤中會自動定位到該元素
5. 找到 `<input name="entry.XXXXXXXXXX" ...>` 標籤
6. 記錄下 `entry.XXXXXXXXXX` 的完整名稱

### 步驟 2: 重複步驟 1 找到其他 7 個欄位

依序找到：
- 聯絡人姓名
- 電子信箱
- 聯絡電話
- 感興趣的服務（複選框）
- 預算範圍（下拉選單）
- 期望完成時間（下拉選單）
- 詳細需求描述（文字區域）

---

## 🎯 範例

假設您找到的欄位名稱如下（這只是範例，實際名稱會不同）：

```javascript
{
    companyName: 'entry.123456789',      // 公司名稱
    contactPerson: 'entry.234567890',    // 聯絡人姓名
    email: 'entry.345678901',            // 電子信箱
    phone: 'entry.456789012',            // 聯絡電話
    services: 'entry.567890123',         // 感興趣的服務
    budget: 'entry.678901234',           // 預算範圍
    timeline: 'entry.789012345',         // 期望完成時間
    requirements: 'entry.890123456'      // 詳細需求描述
}
```

---

## 💡 提示

### 如何辨識欄位類型

- **文字輸入框**: `<input type="text" name="entry.XXXXXXXXXX">`
- **電子郵件**: `<input type="email" name="entry.XXXXXXXXXX">`
- **電話**: `<input type="tel" name="entry.XXXXXXXXXX">`
- **複選框**: `<input type="checkbox" name="entry.XXXXXXXXXX" value="選項名稱">`
- **下拉選單**: `<select name="entry.XXXXXXXXXX">`
- **文字區域**: `<textarea name="entry.XXXXXXXXXX">`

### 複選框的特殊處理

「感興趣的服務」是複選框，可能有多個相同的 `entry.XXXXXXXXXX`，這是正常的。
每個選項都使用相同的 entry 名稱，但 value 不同。

---

## 🚀 找到欄位後該怎麼做

找到所有 8 個欄位名稱後，請告訴我，我會立即更新系統代碼。

格式範例：
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

---

## 🔧 替代方法：查看網頁原始碼

如果開發者工具不好用，可以：

1. 在 Google Forms 頁面上按 `Ctrl+U` (Windows) 或 `Cmd+Option+U` (Mac)
2. 會開啟網頁原始碼
3. 按 `Ctrl+F` 搜尋 `entry.`
4. 依序找到所有欄位名稱

---

## ❓ 常見問題

**Q: 找不到 entry 欄位？**
A: 確保您是在表單的 viewform 頁面，不是 edit 頁面。

**Q: entry 後面的數字很長？**
A: 這是正常的，Google Forms 使用長數字作為欄位 ID。

**Q: 複選框有多個相同的 entry？**
A: 這是正常的，所有選項共用一個 entry 名稱。

---

## 📞 需要協助？

如果您在獲取欄位名稱時遇到困難，請：
1. 截圖開發者工具的畫面
2. 或直接複製找到的 HTML 代碼
3. 告訴我，我會協助您找出正確的欄位名稱

---

**準備好後，請將找到的 8 個欄位名稱告訴我，我會立即更新系統！** 🚀

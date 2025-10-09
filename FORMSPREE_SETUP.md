# 📧 Formspree 設定指南

## 🎯 目標
設定 Formspree 自動 Email 發送，替代手動 mailto 方式。

---

## 📋 設定步驟

### 步驟 1: 註冊 Formspree 帳號
1. 訪問：https://formspree.io/
2. 點擊「Get Started」或「Sign Up」
3. 使用 Google 帳號或 Email 註冊

### 步驟 2: 創建新表單
1. 登入後點擊「New Form」
2. 設定表單名稱：「FlyPig AI Contact Form」
3. 設定收件人 Email：`flypig@icareu.tw`

### 步驟 3: 獲取 Form ID
1. 創建表單後，會獲得一個 Form ID
2. 格式類似：`xpzgkdqw` 或 `y1234567`
3. 完整的 endpoint 會是：`https://formspree.io/f/xpzgkdqw`

### 步驟 4: 更新代碼
在 `static/js/enhanced-contact-form.js` 中找到這行：
```javascript
const endpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

將 `YOUR_FORM_ID` 替換為實際的 Form ID：
```javascript
const endpoint = 'https://formspree.io/f/xpzgkdqw'; // 替換為實際 ID
```

### 步驟 5: 測試功能
1. 部署更新後的代碼
2. 填寫表單並提交
3. 檢查 `flypig@icareu.tw` 是否收到 Email

---

## ⚙️ Formspree 設定選項

### Email 設定
- **To Email**: `flypig@icareu.tw`
- **From Name**: `FlyPig AI Website`
- **Reply-To**: 用戶的 Email（自動設定）

### 安全設定
- **Honeypot**: 啟用（防止垃圾郵件）
- **reCAPTCHA**: 可選（如果需要額外保護）
- **Rate Limiting**: 啟用（防止濫用）

### 通知設定
- **Email Notifications**: 啟用
- **Webhook**: 可選（用於額外處理）

---

## 📊 免費方案限制

### Formspree Free Plan
- ✅ **每月 50 次提交**
- ✅ **無需信用卡**
- ✅ **基本 Email 功能**
- ✅ **垃圾郵件保護**

### 如果需要更多提交
- **Hobby Plan**: $10/月，500 次提交
- **Pro Plan**: $20/月，1000 次提交

---

## 🔧 故障排除

### 常見問題

#### 1. 收到 422 錯誤
- **原因**: 表單驗證失敗
- **解決**: 檢查必填欄位是否正確填寫

#### 2. 收到 429 錯誤
- **原因**: 超過速率限制
- **解決**: 等待幾分鐘後重試

#### 3. Email 沒有收到
- **原因**: 可能被標記為垃圾郵件
- **解決**: 檢查垃圾郵件資料夾

#### 4. CORS 錯誤
- **原因**: 跨域請求被阻擋
- **解決**: Formspree 支援 CORS，檢查 endpoint 是否正確

---

## 📝 Email 範本

Formspree 會自動生成類似這樣的 Email：

```
Subject: FlyPig AI 業務洽詢 - 測試公司

From: FlyPig AI Website <noreply@formspree.io>
Reply-To: test@example.com
To: flypig@icareu.tw

公司名稱: 測試公司
聯絡人姓名: 張三
電子信箱: test@example.com
聯絡電話: 0912345678
感興趣的服務: LLM強化 AI Line Bot, 智能客服機器人
預算範圍: 10-50萬
期望完成時間: 1-3個月
詳細需求描述: 這是測試提交

提交時間: 2024/1/15 下午2:30:45
來源網址: https://flypigai.icareu.tw/
User Agent: Mozilla/5.0...
```

---

## ✅ 完成檢查清單

- [ ] 註冊 Formspree 帳號
- [ ] 創建新表單
- [ ] 設定收件人為 `flypig@icareu.tw`
- [ ] 獲取 Form ID
- [ ] 更新代碼中的 endpoint
- [ ] 測試表單提交
- [ ] 確認收到 Email
- [ ] 檢查垃圾郵件資料夾

---

## 🚀 部署後測試

1. **填寫測試表單**
2. **提交表單**
3. **檢查 Console 日誌**（應該看到「Formspree 提交成功」）
4. **檢查 Email 信箱**
5. **確認收到格式化的 Email**

---

**📧 完成設定後，表單將自動發送 Email 到 `flypig@icareu.tw`！**

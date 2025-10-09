# 🌐 自訂網域設定指南

## 目標網域
**flypigai.icareu.tw**

---

## 📋 完整設定步驟

### 步驟 1: DNS 設定（在您的 DNS 服務商）

#### 🎯 推薦方案：使用 CNAME 記錄

登入您的 DNS 管理介面（通常是網域註冊商，如 GoDaddy、Cloudflare、或您的主機商），添加以下記錄：

```
類型: CNAME
主機名稱/名稱: flypigai
目標/值: mkhsu2002.github.io
TTL: 3600（或使用預設值）
```

#### 📝 DNS 設定範例

**Cloudflare:**
```
Type: CNAME
Name: flypigai
Target: mkhsu2002.github.io
Proxy status: DNS only (灰色雲朵)
TTL: Auto
```

**GoDaddy:**
```
Type: CNAME
Host: flypigai
Points to: mkhsu2002.github.io
TTL: 1 Hour
```

**其他 DNS 服務商:**
- 找到「DNS 管理」或「DNS 設定」
- 添加新記錄
- 選擇 CNAME 類型
- 主機名稱填入：`flypigai`
- 目標填入：`mkhsu2002.github.io`

---

### 步驟 2: GitHub 儲存庫設定

✅ **CNAME 檔案已創建** - 檔案內容：`flypigai.icareu.tw`

現在需要在 GitHub 網站上設定：

1. **前往 GitHub 儲存庫設定**
   - 訪問：https://github.com/mkhsu2002/FlyPigWeb/settings/pages

2. **設定自訂網域**
   - 在「Custom domain」欄位輸入：`flypigai.icareu.tw`
   - 點擊「Save」按鈕

3. **等待 DNS 檢查**
   - GitHub 會自動檢查 DNS 設定
   - 這可能需要幾分鐘到 24 小時（取決於 DNS 傳播速度）
   - 當看到綠色勾勾 ✅ 時表示設定成功

4. **啟用 HTTPS**
   - 勾選「Enforce HTTPS」選項
   - 這會自動為您的網域申請免費的 SSL 憑證
   - 可能需要等待幾分鐘讓憑證生效

---

### 步驟 3: 驗證設定

#### 檢查 DNS 是否生效

**方法 1: 使用命令列**
```bash
# macOS/Linux
nslookup flypigai.icareu.tw

# 或使用 dig
dig flypigai.icareu.tw
```

**方法 2: 使用線上工具**
- https://www.whatsmydns.net/
- 輸入：`flypigai.icareu.tw`
- 檢查全球 DNS 傳播狀態

#### 預期結果
```
flypigai.icareu.tw -> mkhsu2002.github.io -> 185.199.108.153 (或其他 GitHub Pages IP)
```

---

### 步驟 4: 更新網站連結

DNS 生效後，您的網站將可透過以下網址訪問：

- **新網址**: https://flypigai.icareu.tw
- **舊網址**: https://mkhsu2002.github.io/FlyPigWeb/ （仍可使用，會自動重定向）

---

## 🔧 常見問題排解

### ❌ DNS 檢查失敗

**可能原因：**
1. DNS 記錄尚未生效（需要等待 DNS 傳播，通常 10 分鐘到 24 小時）
2. DNS 記錄設定錯誤

**解決方法：**
1. 確認 DNS 記錄設定正確
2. 等待 DNS 傳播完成
3. 使用 `nslookup` 或線上工具檢查 DNS 狀態

### ❌ HTTPS 無法啟用

**可能原因：**
1. DNS 尚未完全生效
2. SSL 憑證正在申請中

**解決方法：**
1. 等待 DNS 完全生效後再啟用 HTTPS
2. 如果已經勾選，取消勾選後等待 5 分鐘再重新勾選

### ❌ 網站顯示 404 錯誤

**可能原因：**
1. CNAME 檔案不存在或內容錯誤
2. GitHub Pages 尚未完成部署

**解決方法：**
1. 確認 CNAME 檔案存在且內容正確
2. 等待幾分鐘讓 GitHub Pages 重新部署

---

## 📊 設定檢查清單

- [ ] 在 DNS 服務商添加 CNAME 記錄
- [ ] CNAME 檔案已推送到 GitHub（✅ 已完成）
- [ ] 在 GitHub Settings 中設定自訂網域
- [ ] 等待 DNS 檢查通過（綠色勾勾）
- [ ] 啟用 HTTPS（Enforce HTTPS）
- [ ] 測試新網域是否可以訪問
- [ ] 更新所有相關文件和連結

---

## 🔗 重要連結

- **GitHub Pages 設定**: https://github.com/mkhsu2002/FlyPigWeb/settings/pages
- **DNS 檢查工具**: https://www.whatsmydns.net/
- **GitHub Pages 文件**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## 📝 設定完成後

設定完成後，請更新以下檔案中的網址：

1. **README.md** - 更新網站連結
2. **index.html** - 更新 canonical URL 和 og:url
3. **line-bot-service.html** - 更新 canonical URL 和 og:url
4. **sitemap.xml** - 更新所有 URL
5. **robots.txt** - 更新 Sitemap URL

---

## 🎉 完成！

設定完成後，您的網站將可透過 **https://flypigai.icareu.tw** 訪問！

如有任何問題，請參考 GitHub Pages 官方文件或聯繫技術支援。

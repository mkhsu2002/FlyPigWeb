# 🌐 GitHub Pages 設定指南

## 📋 快速設定步驟

### 步驟 1: 前往 GitHub 儲存庫設定

1. 開啟瀏覽器，前往您的 GitHub 儲存庫：
   ```
   https://github.com/mkhsu2002/FlyPigWeb
   ```

2. 點擊上方的 **Settings**（設定）標籤

### 步驟 2: 配置 GitHub Pages

1. 在左側選單中，找到 **Pages** 選項（在 Code and automation 區塊下）

2. 在 **Source** 區塊：
   - 選擇 **Deploy from a branch**
   
3. 在 **Branch** 區塊：
   - **Branch**: 選擇 `main`
   - **Folder**: 選擇 `/ (root)`
   - 點擊 **Save** 按鈕

### 步驟 3: 等待部署

1. 部署通常需要 **1-3 分鐘**

2. 重新整理頁面後，您會看到：
   ```
   ✅ Your site is live at https://mkhsu2002.github.io/FlyPigWeb/
   ```

3. 點擊連結即可訪問您的網站！

---

## 🔗 您的網站網址

部署完成後，網站將在以下網址可用：

```
https://mkhsu2002.github.io/FlyPigWeb/
```

### 頁面連結

- **首頁**: https://mkhsu2002.github.io/FlyPigWeb/
- **Line Bot 服務**: https://mkhsu2002.github.io/FlyPigWeb/line-bot-service.html

---

## ✅ 驗證部署狀態

### 方法 1: 透過 Actions 檢查

1. 前往儲存庫的 **Actions** 標籤
2. 查看 **pages build and deployment** 工作流程
3. ✅ 綠色勾勾表示部署成功
4. ❌ 紅色叉叉表示部署失敗（需要檢查錯誤）

### 方法 2: 直接訪問網站

在瀏覽器中開啟：
```
https://mkhsu2002.github.io/FlyPigWeb/
```

如果看到 FlyPig AI 網站，表示部署成功！🎉

---

## 🎯 自訂域名設定（選用）

如果您擁有自己的域名（例如：flypigai.com），可以設定自訂域名：

### 步驟 1: 編輯 CNAME 文件

已經在儲存庫中創建了 `CNAME` 文件。編輯它：

```bash
# 取消註解並填入您的域名
flypigai.com
```

### 步驟 2: 在域名服務商設定 DNS

在您的域名服務商（如 GoDaddy、Namecheap、Cloudflare）添加以下 DNS 記錄：

**選項 A: 使用根域名（推薦）**
```
類型: A
名稱: @
值: 185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
```

**選項 B: 使用子域名（如 www.flypigai.com）**
```
類型: CNAME
名稱: www
值: mkhsu2002.github.io
```

### 步驟 3: 在 GitHub 設定自訂域名

1. 回到 GitHub Pages 設定頁面
2. 在 **Custom domain** 欄位輸入您的域名
3. 點擊 **Save**
4. 勾選 **Enforce HTTPS**（強烈建議）

### 步驟 4: 等待 DNS 生效

DNS 更新可能需要 **24-48 小時**才能完全生效。

---

## 🔍 SEO 驗證工具

部署完成後，建議使用以下工具驗證 SEO 設定：

### Google 工具

1. **Google Search Console**
   - 網址：https://search.google.com/search-console
   - 提交 sitemap: https://mkhsu2002.github.io/FlyPigWeb/sitemap.xml

2. **Google Rich Results Test**
   - 網址：https://search.google.com/test/rich-results
   - 測試結構化資料是否正確

3. **PageSpeed Insights**
   - 網址：https://pagespeed.web.dev/
   - 檢查網站速度和效能

### 其他 SEO 工具

- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Schema Markup Validator**: https://validator.schema.org/
- **Open Graph Debugger**: https://www.opengraph.xyz/

---

## 🚀 更新網站內容

每次更新網站後，只需執行：

```bash
# 1. 確認變更
git status

# 2. 添加所有變更
git add -A

# 3. 提交變更
git commit -m "更新網站內容"

# 4. 推送到 GitHub
git push origin main

# 5. 等待 1-2 分鐘，GitHub Pages 會自動重新部署
```

---

## 🐛 常見問題排解

### Q: 網站顯示 404 錯誤

**解決方法：**
1. 確認 GitHub Pages 設定正確（Branch: main, Folder: / (root)）
2. 確認 `index.html` 在儲存庫根目錄
3. 檢查 Actions 標籤是否有錯誤訊息
4. 等待 5-10 分鐘再嘗試

### Q: 樣式沒有載入

**解決方法：**
1. 檢查瀏覽器控制台（F12）查看錯誤訊息
2. 確認 `static/` 資料夾結構正確
3. 清除瀏覽器快取（Ctrl+Shift+Delete）
4. 檢查 CSS 檔案路徑是否正確

### Q: 圖片無法顯示

**解決方法：**
1. 確認圖片檔案已正確推送到 GitHub
2. 檢查圖片路徑是否正確（相對路徑）
3. 確認圖片檔案大小寫正確（GitHub Pages 區分大小寫）

### Q: 更新後網站沒有變化

**解決方法：**
1. 檢查 git push 是否成功
2. 前往 Actions 標籤確認部署狀態
3. 強制重新整理瀏覽器（Ctrl+Shift+R）
4. 清除瀏覽器快取

---

## 📊 監控與分析

### 設定 Google Analytics（建議）

在 `index.html` 的 `<head>` 區塊添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

替換 `G-XXXXXXXXXX` 為您的 GA 追蹤 ID。

---

## 🎉 完成！

恭喜！您的 FlyPig AI 網站現在已經：

- ✅ 部署到 GitHub Pages
- ✅ 完整 SEO 優化
- ✅ 支援 HTTPS（GitHub 自動提供）
- ✅ 全球 CDN 加速
- ✅ 免費託管，無流量限制
- ✅ 自動化部署流程

**網站網址**: https://mkhsu2002.github.io/FlyPigWeb/

---

## 📞 需要協助？

如有任何問題，請：

1. 查看 [GitHub Pages 官方文檔](https://docs.github.com/pages)
2. 檢查儲存庫的 Issues 標籤
3. 聯絡技術支援: sales@icareu.tw

---

**祝您使用愉快！🚀**

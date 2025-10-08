# FlyPig AI 企業形象網站 v2.0

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://mkhsu2002.github.io/FlyPigWeb/)
[![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-blue)]()
[![Mobile Responsive](https://img.shields.io/badge/Mobile-Responsive-green)]()

🚀 **FlyPig AI 的企業形象網站**，專注於展示 AI 相關服務與解決方案。

🌐 **線上網站**: [https://mkhsu2002.github.io/FlyPigWeb/](https://mkhsu2002.github.io/FlyPigWeb/)

---

## ✨ 功能特色

- 🎨 **現代化設計** - 響應式網頁設計，完美適配各種裝置
- 🔍 **SEO 優化** - 完整的 meta tags、結構化資料、sitemap.xml
- 🚀 **快速載入** - 優化的靜態網站，極速載入體驗
- 📱 **行動優先** - 完美支援手機、平板、桌面裝置
- 🎯 **Google 友好** - robots.txt、sitemap、結構化資料完整配置
- ♿ **無障礙設計** - 符合 ARIA 標準的無障礙網頁

---

## 🎯 服務內容

### 主要服務
1. **LLM強化 AI Line Bot** - 智能聊天機器人客製化服務
2. **智能客服機器人** - 24/7 全天候企業級 AI 客服系統
3. **電商AI影像生成** - 專業的 Martech 影像服務
4. **AI KOL訂製** - 虛擬網紅與數位克隆
5. **多智能體策略決策會議** - AI 協同作業決策系統
6. **社群行銷自動化** - AI 驅動的社群管理系統

---

## 🛠️ 技術架構

### 前端技術
- **HTML5** - 語義化標籤
- **CSS3** - 現代化樣式設計
- **JavaScript (ES6+)** - 互動功能
- **Bootstrap 5** - 響應式框架
- **AOS** - 滾動動畫效果
- **Font Awesome 6** - 圖示庫

### SEO 優化
- ✅ 完整的 meta tags（Open Graph、Twitter Card）
- ✅ 結構化資料（Schema.org JSON-LD）
- ✅ 語義化圖片命名
- ✅ robots.txt 配置
- ✅ sitemap.xml 生成
- ✅ 正規化 URL (canonical)
- ✅ 無障礙 ARIA 標籤

### 部署方式
- **GitHub Pages** - 靜態網站託管（當前部署方式）
- **Docker** - 容器化部署（支援 Flask 版本）
- **Replit** - 雲端開發環境（支援）

---

## 📂 專案結構

```
flypigai_office_website/
├── index.html                          # 首頁（靜態版）
├── line-bot-service.html              # Line Bot 服務頁
├── sitemap.xml                        # 網站地圖
├── robots.txt                         # 爬蟲規則
├── .nojekyll                          # GitHub Pages 配置
├── CNAME                              # 自訂域名配置（可選）
│
├── static/                            # 靜態資源
│   ├── css/
│   │   └── style.css                 # 主要樣式表
│   ├── js/
│   │   └── main.js                   # JavaScript 功能
│   └── images/                        # 圖片資源（SEO 優化命名）
│       ├── flypig-ai-enterprise-logo.jpg
│       ├── ai-martech-solutions-hero-background.svg
│       ├── icareu-ecommerce-company-logo.jpg
│       ├── icareu-company-logo-vector.svg
│       └── flypig-ai-brand-logo.svg
│
├── templates/                         # Flask 模板（原始檔案）
│   ├── index.html
│   └── line_bot_service.html
│
├── main.py                            # Flask 應用程式（開發用）
├── convert_to_static.py              # 模板轉換腳本
├── Dockerfile                         # Docker 配置
├── deployment_guide.md               # 部署指南
└── README.md                          # 本文件
```

---

## 🚀 快速開始

### 方法一：直接訪問線上網站
直接訪問：[https://mkhsu2002.github.io/FlyPigWeb/](https://mkhsu2002.github.io/FlyPigWeb/)

### 方法二：本地開發（使用 Flask）

```bash
# 1. 克隆儲存庫
git clone https://github.com/mkhsu2002/FlyPigWeb.git
cd FlyPigWeb

# 2. 安裝依賴
pip install flask email-validator

# 3. 運行開發伺服器
python main.py

# 4. 訪問網站
# 開啟瀏覽器：http://localhost:5000
```

### 方法三：本地預覽靜態版本

```bash
# 使用 Python 簡易伺服器
python -m http.server 8000

# 訪問：http://localhost:8000
```

---

## 📝 更新網站內容

### 更新 HTML 內容

1. **編輯原始模板**（推薦）
   ```bash
   # 編輯 templates/ 目錄下的文件
   vim templates/index.html
   vim templates/line_bot_service.html
   ```

2. **轉換為靜態 HTML**
   ```bash
   python convert_to_static.py
   ```

3. **或直接編輯靜態 HTML**
   ```bash
   # 直接編輯根目錄的靜態文件
   vim index.html
   vim line-bot-service.html
   ```

### 更新樣式與腳本

```bash
# CSS
vim static/css/style.css

# JavaScript
vim static/js/main.js
```

---

## 🌐 部署到 GitHub Pages

### 自動部署（推薦）

網站已配置為自動從 `main` 分支部署到 GitHub Pages。

### 手動更新部署

```bash
# 1. 提交變更
git add .
git commit -m "更新網站內容"

# 2. 推送到 GitHub
git push origin main

# 3. GitHub Pages 會自動部署（約 1-2 分鐘）
```

### 配置 GitHub Pages

1. 進入 GitHub 儲存庫設定
2. 找到 **Pages** 選項
3. 選擇 **Source**: Deploy from a branch
4. 選擇 **Branch**: `main` / `(root)`
5. 點擊 **Save**
6. 等待部署完成（約 1-2 分鐘）

### 設定自訂域名（可選）

1. 編輯 `CNAME` 文件，填入您的域名
2. 在域名服務商設定 DNS：
   ```
   CNAME  @  mkhsu2002.github.io
   ```
3. 推送變更到 GitHub

---

## 🔍 SEO 檢查清單

- ✅ Meta description（每頁不同）
- ✅ Title tags（每頁不同）
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ 結構化資料（Schema.org）
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ 語義化 HTML 標籤
- ✅ 圖片 alt 屬性
- ✅ 圖片檔名優化
- ✅ Canonical URLs
- ✅ 響應式設計
- ✅ 快速載入時間
- ✅ HTTPS（GitHub Pages 自動提供）

---

## 📊 效能優化

- ⚡ 使用 CDN 載入 Bootstrap、AOS、Font Awesome
- 🎨 CSS/JS 最小化
- 🖼️ 圖片優化（適當大小和格式）
- 📱 行動優先設計
- 🚀 靜態網站，無伺服器運算延遲

---

## 📞 聯絡資訊

- **Email**: sales@icareu.tw
- **Facebook**: [FlyPig AI](https://www.facebook.com/FlyPigAI)
- **GitHub**: [@mkhsu2002](https://github.com/mkhsu2002)
- **Line ID**: @icareutw

---

## 📄 授權與版權

© 2024-2025 FlyPig AI - 艾可開發AI業務部. All rights reserved.

本網站完全透過與 AI 對話生成。

---

## 🔄 版本紀錄

### v2.0 (2025-10)
- ✨ 轉換為靜態網站，部署至 GitHub Pages
- 🔍 完整 SEO 優化（meta tags、結構化資料、sitemap）
- 🎨 圖片檔名優化，提升搜尋引擎可見度
- 📱 改進響應式設計
- ⚡ 效能優化，極速載入

### v1.1 (2024-04)
- 🎉 完成基礎企業形象網站建置
- 🌐 多語言支援架構
- 📧 整合 Google 表單

---

## 🤝 貢獻

歡迎提出 Issue 或 Pull Request！

---

**Made with ❤️ by FlyPig AI Team**
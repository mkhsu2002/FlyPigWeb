# FlyPig AI 網站本地部署指南

## 環境需求
- Python 3.11 或以上版本
- pip (Python 包管理器)
- 建議主機配置：
  - CPU: 雙核心或以上
  - 記憶體: 2GB 或以上
  - 硬碟空間: 至少 100MB 可用空間
  - 網路: 穩定的網路連接，可提供 HTTP 服務
  - 作業系統：支援 Windows、Linux 或 macOS
  - 瀏覽器：建議使用最新版本的 Chrome、Firefox 或 Safari
  - NAS系統：建議使用支援 Python 的 NAS 系統，如 Synology、QNAP 等

## 環境準備
1. 確保 NAS 系統已啟用 SSH 訪問
2. 確認 Python 環境可正常運行
3. 檢查網路端口 5000 是否可用
4. 確認系統防火牆設置允許 Web 服務

## 必要檔案清單
以下檔案必須保留：
```
├── static/
│   ├── css/
│   │   └── style.css      # 網站樣式表
│   ├── images/
│   │   ├── hero-bg.svg    # 首頁背景圖
│   │   ├── logo.svg       # FlyPig AI logo
│   │   └── icareu-logo.svg # ICareU logo
│   └── js/
│       └── main.js        # 網站功能腳本
├── templates/
│   └── index.html         # 網站主頁面
└── main.py               # Flask 應用程式主文件
```

以下檔案可以安全刪除（非必要）：
- translations/ 資料夾（多語言檔案，因為已決定只使用中文介面）
- babel.cfg（多語言配置檔案，不再需要）
- messages.pot（多語言模板檔案）
- .replit（Replit平台配置文件）
- replit.nix（Replit平台配置文件）
- pyproject.toml（Python專案配置文件，本地部署不需要）
- uv.lock（套件版本鎖定檔案，本地部署不需要）

注意：本網站已移除多語言支援功能，專注於提供純中文介面，以簡化部署和維護流程。所有與多語言相關的檔案（translations/、babel.cfg、messages.pot）都可以安全移除。

## 必要套件
- Flask==3.0.0 (Web 框架)
- email-validator==2.1.0.post1 (信箱格式驗證)

## 安裝步驟

1. 安裝 Python 環境
   - 從 Python 官網下載並安裝 Python 3.11：https://www.python.org/downloads/
   - 確認安裝成功：
     ```bash
     python --version  # 應顯示 Python 3.11.x
     pip --version    # 確認 pip 可用
     ```

2. 建立並進入專案資料夾
   ```bash
   mkdir flypig_ai
   cd flypig_ai
   ```

3. 複製必要檔案到專案資料夾
   - 僅複製上述「必要檔案清單」中列出的檔案
   - 保持資料夾結構完整
   - 確認所有靜態資源（圖片、CSS、JS）都已正確複製
   - 移除非必要檔案（如 translations 資料夾等）

4. 安裝必要套件
   ```bash
   pip install Flask==3.0.0
   pip install email-validator==2.1.0.post1
   ```

5. 配置運行環境
   - 確認防火牆允許 5000 端口訪問
   - 確認 Python 和相關目錄有足夠的執行權限
   - 建議設置環境變數（可選）：
     ```bash
     export FLASK_ENV=production
     export FLASK_DEBUG=0
     ```

6. 運行網站
   ```bash
   python main.py
   ```
   網站會在背景持續運行，如需停止請使用 Ctrl+C

7. 訪問網站
   - 本機訪問：http://localhost:5000
   - 區網訪問：http://<NAS_IP>:5000
   - 建議使用瀏覽器：Chrome, Firefox, Safari 最新版本

## 注意事項與最佳實踐
1. 安全性考量
   - 建議修改 main.py 中的 secret_key
   - 避免在生產環境開啟 debug 模式
   - 定期更新 Python 和相關套件版本

2. 效能優化
   - 考慮使用 nginx 作為反向代理，可提供更好的靜態檔案服務和負載平衡
   - 可啟用靜態檔案快取，減輕伺服器負擔
   - 監控系統資源使用情況（CPU、記憶體、網路流量）
   - 建議使用 supervisor 或類似工具管理 Flask 程序
   - 如遇到效能瓶頸，可考慮：
     * 增加伺服器資源配置
     * 優化資料庫查詢（如果後續添加）
     * 使用 CDN 加速靜態資源載入
     * 實施適當的快取策略

3. 維護建議
   - 定期備份整個專案資料夾
   - 保持日誌紀錄以便故障排除
   - 建立系統監控機制

## 常見問題排解
1. 無法啟動服務
   - 檢查 Python 版本是否正確
   - 確認所有必要套件已正確安裝
   - 檢查 5000 端口是否被占用
   - 檢查系統日誌查找錯誤信息

2. 靜態資源無法載入
   - 確認 static 資料夾結構是否正確
   - 檢查檔案權限設定
   - 清除瀏覽器快取
   - 檢查網路連接狀態

3. 頁面無法訪問
   - 確認防火牆設定是否允許 5000 端口訪問
   - 檢查 NAS 的網路設定
   - 確認服務是否正在運行
   - 嘗試使用不同的瀏覽器測試

4. 效能問題
   - 檢查系統資源使用情況
   - 考慮增加系統資源配置
   - 優化靜態檔案載入
   - 監控網路連接品質

# FlyPig AI 網站 Docker 部署指南

## 環境需求
- Docker Engine 24.0.0 或以上
- NAS系統支援 Docker
- 建議配置：
  - CPU: 雙核心或以上
  - 記憶體: 1GB 或以上
  - 硬碟空間: 至少 100MB 可用空間
  - 網路: 穩定的網路連接

## 必要檔案清單
```
project/
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
├── main.py               # Flask 應用程式主文件
└── Dockerfile           # Docker 建置檔案
```

## Dockerfile 配置
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "main.py"]
```

## requirements.txt 內容
```
Flask==3.0.0
email-validator==2.1.0.post1
```

## Docker 部署步驟

1. 建立專案資料夾
```bash
mkdir flypig_ai
cd flypig_ai
```

2. 複製所有必要檔案到專案資料夾
   - 確保資料夾結構如上述「必要檔案清單」所示
   - 移除所有非必要檔案

3. 建立並編輯 Dockerfile
   - 使用上述 Dockerfile 設定
   - 確保 requirements.txt 存在且內容正確

4. 建構 Docker 映像檔
```bash
docker build -t flypig-ai .
```

5. 運行容器
```bash
docker run -d \
  --name flypig-ai \
  -p 5000:5000 \
  --restart unless-stopped \
  flypig-ai
```

6. 確認服務運作狀態
```bash
docker ps
docker logs flypig-ai
```

## 環境變數設定（可選）
如需設定環境變數，在運行容器時加入：
```bash
docker run -d \
  --name flypig-ai \
  -p 5000:5000 \
  -e FLASK_ENV=production \
  -e FLASK_DEBUG=0 \
  --restart unless-stopped \
  flypig-ai
```

## 網路設定
1. NAS Docker 網路設定：
   - 確保 5000 端口對外開放
   - 設定防火牆允許該端口訪問
   - 如使用反向代理，確保代理設定正確

2. 訪問網站：
   - 本地訪問：http://localhost:5000
   - 區網訪問：http://<NAS_IP>:5000
   - 透過反向代理訪問：依照您的域名設定

## 維護與更新
1. 停止並移除舊容器
```bash
docker stop flypig-ai
docker rm flypig-ai
```

2. 拉取或建構新映像檔
```bash
docker build -t flypig-ai .
```

3. 運行新容器
```bash
docker run -d --name flypig-ai -p 5000:5000 --restart unless-stopped flypig-ai
```

## 常見問題排解

1. 容器無法啟動
   - 檢查 Docker 日誌：`docker logs flypig-ai`
   - 確認端口未被占用：`docker ps -a`
   - 確認映像檔建構正確：`docker images`

2. 網站無法訪問
   - 確認容器運行狀態：`docker ps`
   - 檢查端口映射：`docker port flypig-ai`
   - 確認防火牆設定
   - 測試不同的訪問方式（localhost/IP）

3. 靜態資源無法載入
   - 確認檔案結構正確
   - 檢查容器內檔案權限
   - 確認 static 資料夾存在且內容完整

4. 效能優化建議
   - 考慮使用 nginx 作為反向代理
   - 啟用靜態檔案快取
   - 監控容器資源使用情況：`docker stats flypig-ai`
   - 適當調整容器資源限制

## 反向代理設定（建議）

### Nginx 配置範例
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        alias /path/to/your/static/files;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## 安全性建議
1. 永遠使用最新版本的 Python 映像檔
2. 定期更新相依套件
3. 限制容器資源使用
4. 使用非 root 用戶運行容器
5. 啟用 Docker 安全掃描
6. 實施適當的備份策略

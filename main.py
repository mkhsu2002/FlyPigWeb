from flask import Flask, render_template, request, flash, redirect, url_for
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for flash messages

# 郵件伺服器設定
SMTP_SERVER = 'mail.icareu.tw'  # 您的郵件伺服器地址
SMTP_PORT = 465  # 使用 SSL 加密的端口
SMTP_USERNAME = 'flypig@icareu.tw'  # 您的郵件帳號
SMTP_PASSWORD = os.environ.get('EMAIL_PASSWORD', '')  # 從環境變數獲取密碼
RECIPIENT_EMAIL = 'flypig@icareu.tw'  # 接收郵件的地址

def send_email(name, email, service, message):
    """
    使用 SMTP_SSL 發送郵件 (SSL 加密連線)
    """
    try:
        # 創建郵件對象
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f'FlyPig AI 網站表單: {service} 服務諮詢'
        
        # 郵件內容
        body = f"""
收到來自網站的新諮詢：

姓名: {name}
郵箱: {email}
服務: {service}
訊息:
{message}
        """
        msg.attach(MIMEText(body, 'plain'))
        
        # 使用 SSL 連接到 SMTP 伺服器並發送郵件
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            
        logging.info(f"成功發送郵件給 {RECIPIENT_EMAIL}")
        return True
    except Exception as e:
        logging.error(f"發送郵件時出錯: {str(e)}")
        return False

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # 獲取表單數據
        name = request.form.get('name', '')
        email = request.form.get('email', '')
        service = request.form.get('service', '')
        message = request.form.get('message', '')
        
        # 發送郵件
        success = send_email(name, email, service, message)
        
        if success:
            flash('感謝您的訊息！我們將盡快回覆您。', 'success')
        else:
            flash('發送訊息時出錯，請稍後再試或直接聯繫我們。', 'danger')
        
        # 重定向回首頁，避免表單重複提交
        return redirect(url_for('index'))
        
    return render_template('index.html')

@app.route('/line-bot-service')
def line_bot_service():
    return render_template('line_bot_service.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

from flask import Flask, render_template, request, flash
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for flash messages

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        service = request.form.get('service')
        message = request.form.get('message')
        
        # Here you would typically handle the form submission (e.g., send email)
        flash(f'感謝您的訊息！我們已收到您關於{service}服務的諮詢，會盡快回覆。', 'success')
        
    return render_template('index.html')

@app.route('/line-bot-service')
def line_bot_service():
    return render_template('line_bot_service.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

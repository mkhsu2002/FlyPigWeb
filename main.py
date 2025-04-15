from flask import Flask, render_template, request, flash
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for flash messages

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # We won't actually process this since we're using mailto:
        # But keep the flash message functionality in case we need it later
        flash('感謝您的訊息！我們將盡快回覆您。', 'success')
        
    return render_template('index.html')

@app.route('/line-bot-service')
def line_bot_service():
    return render_template('line_bot_service.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

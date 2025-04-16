from flask import Flask, render_template
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for sessions if needed

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', request=request)

@app.before_request
def redirect_to_canonical():
    """確保所有請求使用規範化的URL"""
    if request.url.endswith('/'):
        return redirect(request.url.rstrip('/'))

@app.route('/line-bot-service')
def line_bot_service():
    return render_template('line_bot_service.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

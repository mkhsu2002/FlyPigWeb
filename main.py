from flask import Flask, render_template, request, flash, g, session
from flask_babel import Babel, gettext as _
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for flash messages
babel = Babel(app)

# Available languages
LANGUAGES = {
    'zh': '中文',
    'en': 'English',
    'ja': '日本語'
}

def get_locale():
    # 如果session中有語言設定，使用該設定
    if session.get('language'):
        return session.get('language')
    # 否則使用瀏覽器偏好語言
    return request.accept_languages.best_match(LANGUAGES.keys())

babel.init_app(app, locale_selector=get_locale)

@app.route('/language/<language>')
def set_language(language):
    if language in LANGUAGES:
        session['language'] = language
    return request.referrer or '/'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        service = request.form.get('service')
        message = request.form.get('message')
        
        # Here you would typically handle the form submission (e.g., send email)
        flash(_('感謝您的訊息！我們已收到您關於%(service)s服務的諮詢，會盡快回覆。', service=service), 'success')
        
    return render_template('index.html', languages=LANGUAGES)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

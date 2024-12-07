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
    if not session.get('language'):
        session['language'] = request.accept_languages.best_match(LANGUAGES.keys())
    return session.get('language')

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

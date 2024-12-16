from flask import Flask, render_template, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import logging
from datetime import datetime
import os

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for flash messages

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Contact form model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    service = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Contact {self.name}>'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        service = request.form.get('service')
        message = request.form.get('message')
        
        # Save contact form data to database
        contact = Contact(
            name=name,
            email=email,
            service=service,
            message=message
        )
        db.session.add(contact)
        try:
            db.session.commit()
            flash(f'感謝您的訊息！我們已收到您關於{service}服務的諮詢，會盡快回覆。', 'success')
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error saving contact form: {str(e)}")
            flash('抱歉，系統暫時無法處理您的請求，請稍後再試。', 'error')
        
    return render_template('index.html')

@app.route('/admin/messages')
def view_messages():
    messages = Contact.query.order_by(Contact.created_at.desc()).all()
    return render_template('admin/messages.html', messages=messages)

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

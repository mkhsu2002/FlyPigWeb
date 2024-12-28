from flask import Flask, render_template, request, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'flypig_ai_secret_key'  # Required for flash messages

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Message model
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    service = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'service': self.service,
            'message': self.message,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# Create tables
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        service = request.form.get('service')
        message_text = request.form.get('message')

        # Save message to database
        new_message = Message(
            name=name,
            email=email,
            service=service,
            message=message_text
        )
        db.session.add(new_message)
        try:
            db.session.commit()
            flash(f'感謝您的訊息！我們已收到您關於{service}服務的諮詢，會盡快回覆。', 'success')
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error saving message: {e}")
            flash('抱歉，訊息發送失敗，請稍後再試。', 'error')

    return render_template('index.html')

@app.route('/admin/messages')
def view_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return render_template('admin/messages.html', messages=messages)

@app.route('/api/messages')
def get_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([message.to_dict() for message in messages])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
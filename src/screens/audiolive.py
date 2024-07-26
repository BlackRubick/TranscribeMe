from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
import speech_recognition as sr
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:password@localhost/transcriptions_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")

class Transcription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    course_id = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, text, course_id):
        self.text = text
        self.course_id = course_id

def init_db():
    with app.app_context():
        db.create_all()

@app.route('/save_transcription', methods=['POST'])
def save_transcription():
    data = request.json
    if not data or 'text' not in data or 'courseId' not in data:
        return jsonify({'message': 'Invalid data'}), 400

    transcription = Transcription(text=data['text'], course_id=data['courseId'])
    db.session.add(transcription)
    db.session.commit()
    return jsonify({'message': 'Transcription saved'}), 201

@app.route('/get_transcriptions', methods=['GET'])
def get_transcriptions():
    try:
        transcriptions = Transcription.query.all()
        return jsonify([{
            'id': t.id,
            'text': t.text,
            'course_id': t.course_id,
            'date': t.date
        } for t in transcriptions])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/transcribeGoogle', methods=['POST'])
def transcribeGoogle():
    audio_bytes = request.data
    if len(audio_bytes) == 0:
        return jsonify({'transcription': ''})
    else:
        recognizer = sr.Recognizer()
        audio_data = sr.AudioData(audio_bytes, 16000, 2)
        try:
            text = recognizer.recognize_google(audio_data, language='es-ES')
            socketio.emit('transcription', {'transcription': text})

            course_id = request.args.get('course_id', 'default')
            transcription = Transcription(text=text, course_id=course_id)
            db.session.add(transcription)
            db.session.commit()
            return jsonify({'transcription': text})

        except sr.UnknownValueError:
            text = ""
        except sr.RequestError as e:
            print(f"Couldn't request results; {e}")
            text = ""
        return jsonify({'transcription': text})

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

if __name__ == '__main__':
    init_db()
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, disconnect
import speech_recognition as sr

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

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
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)

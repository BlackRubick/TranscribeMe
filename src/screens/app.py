from flask import Flask, request, jsonify
import speech_recognition as sr
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
auth = HTTPBasicAuth()

users = {"usuario": "Gatito.24"}

@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username

@app.route('/transcribeGoogle', methods=['POST'])
@auth.login_required
def transcribeGoogle():
    print("Transcribing with Google...")
    audio_bytes = request.data
    if len(audio_bytes) == 0:
        return jsonify({'transcription': ''})
    else:
        recognizer = sr.Recognizer()
        audio_data = sr.AudioData(audio_bytes, 16000, 2)
        try:
            text = recognizer.recognize_google(audio_data, language='es-ES')
            print("Google transcribed: ", text)
        except sr.UnknownValueError:
            text = ""
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
            text = ""
        return jsonify({'transcription': text})

if __name__ == '__main__':
    app.run(debug=True)

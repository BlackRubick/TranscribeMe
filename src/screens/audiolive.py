from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
import os
import speech_recognition as sr
from flask_httpauth import HTTPBasicAuth
import spacy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
auth = HTTPBasicAuth()

# Load SpaCy English model
nlp = spacy.load("en_core_web_sm")

# Users dictionary for HTTP Basic Authentication
users = {
    "usuario": "Gatito.24"
}

@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username

def correct_grammar(text):
    """
    Corrects the grammar of the given text using SpaCy.
    """
    doc = nlp(text)
    corrected_text = []
    for sent in doc.sents:
        corrected_sent = " ".join([token.text for token in sent])
        corrected_text.append(corrected_sent)
    return " ".join(corrected_text)

@app.route('/transcribeGoogle', methods=['POST'])
@auth.login_required
def transcribeGoogle():
    """
    Endpoint to transcribe audio using Google's speech recognition and correct grammar.
    """
    print("Transcribing with Google...")
    audio_bytes = request.data
    if len(audio_bytes) == 0:
        return jsonify({'transcription': ''})
    else:
        recognizer = sr.Recognizer()
        audio_data = sr.AudioData(audio_bytes, 16000, 2)
        try:
            text = recognizer.recognize_google(audio_data, language='es-ES')
            corrected_text = correct_grammar(text)
            print("Google transcribed: ", corrected_text)
            socketio.emit('transcription', {'transcription': corrected_text})
        except sr.UnknownValueError:
            corrected_text = ""
        except sr.RequestError as e:
            print(f"Couldn't request results; {e}")
            corrected_text = ""
        return jsonify({'transcription': corrected_text})

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)

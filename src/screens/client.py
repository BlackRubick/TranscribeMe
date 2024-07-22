import concurrent.futures
import sounddevice as sd
import requests
import numpy as np
import io
import pyaudio
import base64
import math

p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8000)
stream.start_stream()

def sendRequest(data, isGoogle):
    auth = ("usuario", "Gatito.24")
    headers = {'Authorization': 'Basic ' + base64.b64encode(f"{auth[0]}:{auth[1]}".encode()).decode()}
    if isGoogle:
        response = requests.post('http://localhost:5000/transcribeGoogle', data=data, headers=headers)
    else:
        response = requests.post('http://localhost:5000/transcribe', data=data, headers=headers)

    if response.text:
        print("transcribing locally", response.json())
    else:
        print("Empty response from server")

def calculate_rms(data):
    count = len(data)/2
    format = "%dh" % (count)
    shorts = np.frombuffer(data, np.int16)
    sum_squares = 0.0
    for sample in shorts:
        n = sample * (1.0/32768)
        sum_squares += n*n
    rms = math.sqrt(sum_squares / count)
    return rms * 1000

while True:
    try:
        data = stream.read(48000)
        rms_value = calculate_rms(data)
        print(f"RMS Value: {rms_value}")
        if rms_value > 0.5:  # Threshold for detecting speech, adjust as needed
            data = np.frombuffer(data, np.int16) * 1.1  # Optionally increase volume
            data = data.astype(np.int16).tobytes()
            concurrent.futures.ThreadPoolExecutor().submit(sendRequest, data, True)
        else:
            print("No speech detected")

    except Exception as e:
        print(e)
        break
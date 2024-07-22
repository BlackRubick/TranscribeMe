import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Audio } from 'expo-av';
import axios from 'axios';
import base64 from 'base-64';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AndroidAudioEncoder, AndroidOutputFormat, IOSOutputFormat } from '../components/Recording';
import { IOSAudioQuality } from 'expo-av/build/Audio';

type IniciarTranscripcionNavigationProp = StackNavigationProp<RootStackParamList, 'IniciarTranscripcion'>;
type IniciarTranscripcionRouteProp = RouteProp<RootStackParamList, 'IniciarTranscripcion'>;

type Props = {
  navigation: IniciarTranscripcionNavigationProp;
  route: IniciarTranscripcionRouteProp;
};

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: AndroidOutputFormat.MPEG_4,
    audioEncoder: AndroidAudioEncoder.AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.caf',
    outputFormat: IOSOutputFormat.MPEG4AAC,
    audioQuality: IOSAudioQuality.HIGH,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

const calculateRMS = (data: ArrayBuffer) => {
  const samples = new Int16Array(data);
  const sumSquares = samples.reduce((sum, sample) => sum + (sample / 32768) ** 2, 0);
  const rms = Math.sqrt(sumSquares / samples.length);
  return rms * 1000;
};

const IniciarTranscripcion: React.FC<Props> = ({ route }) => {
  const { course } = route.params;
  const [transcription, setTranscription] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recording = useRef<Audio.Recording | null>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    console.log('Requesting permissions..');
    const permission = await Audio.requestPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Error', 'Permission to access microphone is required!');
      return;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    console.log('Starting recording..');
    const { recording: newRecording } = await Audio.Recording.createAsync(recordingOptions);
    recording.current = newRecording;
    setIsRecording(true);
    console.log('Recording started');

    recordingInterval.current = setInterval(async () => {
      if (recording.current) {
        try {
          const status = await recording.current.getStatusAsync();
          if (status.isRecording) {
            await recording.current.pauseAsync();
            const uri = recording.current.getURI();
            if (uri) {
              const audioData = await fetch(uri).then((res) => res.arrayBuffer());
              const rmsValue = calculateRMS(audioData);
              console.log(`RMS Value: ${rmsValue}`);
              if (rmsValue > 0.5) {  // Threshold for detecting speech, adjust as needed
                console.log('Speech detected');
                await sendRequest(audioData);
              } else {
                console.log('No speech detected');
              }
            }
            await recording.current.startAsync(); // Restart recording after each interval
          }
        } catch (error) {
          console.error('Error reading recording data:', error);
        }
      }
    }, 5000); // Adjust the interval as needed
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
    if (recording.current) {
      try {
        await recording.current.stopAndUnloadAsync();
        const uri = recording.current.getURI();
        if (uri) {
          console.log('Recording stopped and stored at', uri);
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
      recording.current = null;
    }
  };

  const handleStart = async () => {
    console.log('Start button clicked');
    await startRecording();
  };

  const handleStop = async () => {
    console.log('Stop button clicked');
    await stopRecording();
  };

  const sendRequest = async (data: ArrayBuffer) => {
    const auth = "usuario:Gatito.24";
    const headers = {
      'Authorization': 'Basic ' + base64.encode(auth),
      'Content-Type': 'audio/m4a',
    };
    const url = (Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001') + '/transcribeGoogle';

    try {
      const response = await axios.post(url, data, { headers });
      console.log("Transcription:", response.data.transcription);
      setTranscription(prevTranscription => prevTranscription + " " + response.data.transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.courseTitle}>{course.name} - {course.grade}B</Text>
        <View style={styles.instructorContainer}>
          <Image source={require('../../assets/instructor1.png')} style={styles.instructorImage} />
          <Text style={styles.instructorName}>{course.teacher}</Text>
          <Text style={styles.liveText}>Transcripción en vivo</Text>
        </View>
        <Image source={require('../../assets/voice-recorder.png')} style={styles.recorderImage} />
        <TextInput
          style={styles.transcriptionBox}
          value={transcription}
          onChangeText={setTranscription}
          multiline
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStart} disabled={isRecording}>
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopButton} onPress={handleStop} disabled={!isRecording}>
            <Text style={styles.stopButtonText}>Detener</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  courseTitle: {
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  instructorName: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  liveText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'lightgreen',
  },
  recorderImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  transcriptionBox: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    width: '100%',
    height: 200,
    padding: 10,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
  stopButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
});

export default IniciarTranscripcion;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import io from 'socket.io-client';

type IniciarTranscripcionNavigationProp = StackNavigationProp<RootStackParamList, 'IniciarTranscripcion'>;
type IniciarTranscripcionRouteProp = RouteProp<RootStackParamList, 'IniciarTranscripcion'>;

type Props = {
  navigation: IniciarTranscripcionNavigationProp;
  route: IniciarTranscripcionRouteProp;
};

const IniciarTranscripcion: React.FC<Props> = ({ route }) => {
  const { course } = route.params;
  const [transcription, setTranscription] = useState<string>('');
  
  // Configurar la URL del servidor según la plataforma
  const socketUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
  const socket = io(socketUrl);

  useEffect(() => {
    socket.on('transcription', (data) => {
      setTranscription(prevTranscription => prevTranscription + " " + data.transcription);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
          multiline
          editable={false}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopButton}>
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

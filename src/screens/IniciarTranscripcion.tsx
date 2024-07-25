import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import io from 'socket.io-client';
import styles from '../styles/IniciarTranscripcionStyles';

type IniciarTranscripcionNavigationProp = StackNavigationProp<RootStackParamList, 'IniciarTranscripcion'>;
type IniciarTranscripcionRouteProp = RouteProp<RootStackParamList, 'IniciarTranscripcion'>;

type Props = {
  navigation: IniciarTranscripcionNavigationProp;
  route: IniciarTranscripcionRouteProp;
};

const IniciarTranscripcion: React.FC<Props> = ({ route }) => {
  const { course } = route.params;
  const [transcription, setTranscription] = useState<string>('');
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

  // Configurar la URL del servidor según la plataforma
  const socketUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
  const socket = io(socketUrl);

  useEffect(() => {
    socket.on('connect', () => {
      setIsSocketConnected(true);
      console.log('Socket connected');
    });

    socket.on('transcription', (data) => {
      setTranscription(prevTranscription => prevTranscription + " " + data.transcription);
    });

    socket.on('disconnect', () => {
      setIsSocketConnected(false);
      console.log('Socket disconnected');
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

export default IniciarTranscripcion;

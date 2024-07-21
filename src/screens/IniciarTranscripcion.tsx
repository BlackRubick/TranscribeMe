import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import Footer from '../components/Footer';

type IniciarTranscripcionNavigationProp = StackNavigationProp<RootStackParamList, 'IniciarTranscripcion'>;
type IniciarTranscripcionRouteProp = RouteProp<RootStackParamList, 'IniciarTranscripcion'>;

type Props = {
  navigation: IniciarTranscripcionNavigationProp;
  route: IniciarTranscripcionRouteProp;
};

const IniciarTranscripcion: React.FC<Props> = ({ route }) => {
  const { course } = route.params;

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
        <Text style={styles.recordingStatus}>Grabación en pausa</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.pauseButton}>
            <FontAwesome name="pause" size={24} color="white" />
            <Text style={styles.pauseButtonText}>Pausado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeButton}>
            <FontAwesome name="play" size={24} color="white" />
            <Text style={styles.resumeButtonText}>Reanudar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <FontAwesome name="save" size={24} color="white" />
            <Text style={styles.saveButtonText}>Guardar</Text>
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
  recordingStatus: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  pauseButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
  },
  resumeButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
  },
  pauseButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  resumeButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  startButton: {
    backgroundColor: '#007bff',
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
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
  },
});

export default IniciarTranscripcion;

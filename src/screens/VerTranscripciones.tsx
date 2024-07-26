import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../styles/VerTranscripcionesStyles';
import CompartirQR from '../components/CompartirQR'; // Import the component

type VerTranscripcionesScreenNavigationProp = StackNavigationProp<RootStackParamList, "VerTranscripciones">;
type VerTranscripcionesRouteProp = RouteProp<RootStackParamList, "VerTranscripciones">;

type Props = {
  navigation: VerTranscripcionesScreenNavigationProp;
  route: VerTranscripcionesRouteProp;
};

const VerTranscripciones: React.FC<Props> = ({ route }) => {
  const { transcript } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>Transcripción Guardada</Text>
          <Text style={styles.classSubtitle}>{new Date(transcript.date).toLocaleString()}</Text>
          <View style={styles.classDetails}>
            <FontAwesome name="users" size={20} color="white" />
            <Text style={[styles.classSubtitle, { marginLeft: 5 }]}>{transcript.students} estudiantes</Text>
          </View>
        </View>
        <View style={styles.transcriptionCard}>
          <Text style={styles.transcriptionText}>{transcript.text}</Text>
        </View>
        <TouchableOpacity style={styles.summaryButton}>
          <Text style={styles.summaryButtonText}>Resumen autogenerado</Text>
        </TouchableOpacity>
        {transcript.summary && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>{transcript.summary}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.shareButton} onPress={toggleModal}>
          <FontAwesome name="qrcode" size={24} color="white" />
          <Text style={styles.shareButtonText}>Compartir QR</Text>
        </TouchableOpacity>
      </ScrollView>
      <CompartirQR
        visible={modalVisible}
        onClose={toggleModal}
        transcriptionText={transcript.text}
      />
      <Footer />
    </LinearGradient>
  );
};

export default VerTranscripciones;

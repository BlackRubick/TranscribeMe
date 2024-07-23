import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/JoinTranscriptionStyles';

const JoinTranscription: React.FC = () => {
  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.joinContainer}>
          <Text style={styles.title}>Unirse a una transcripción en vivo</Text>
          <Image source={require('../../assets/join-icon.png')} style={styles.joinIcon} />
          <Text style={styles.subtitle}>Ingrese el código proporcionado por su maestro:</Text>
          <TextInput
            style={styles.input}
            placeholder="XXXXXX"
            placeholderTextColor="#aaa"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Unirse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default JoinTranscription;

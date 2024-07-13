import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  joinContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  joinIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  joinButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  joinButtonText: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 16,
  },
  cancelButtonText: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 16,
  },
});

export default JoinTranscription;

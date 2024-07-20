import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type JoinClassScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JoinClass'>;

type Props = {
  navigation: JoinClassScreenNavigationProp;
};

const JoinClass: React.FC<Props> = ({ navigation }) => {
  const [codeClass, setCodeClass] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [classId, setClassId] = useState<string>(''); // Asumes que tienes el class id desde el contexto o props

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert('Error', 'No se pudo obtener el ID del usuario');
      }
    };

    getUserId();
  }, []);

  const joinClass = async () => {
    if (!userId || !classId || !codeClass) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Primera petición
      await axios.post(`http://10.0.2.2:3004/api/v1/users-classes/${userId}/${classId}/${codeClass}`, {}, { headers: myHeaders });

      // Segunda petición
      await axios.put(`http://10.0.2.2:3004/api/v1/class/add-number-student/${classId}`, {}, { headers: myHeaders });

      Alert.alert('Éxito', 'Te has unido exitosamente a la clase');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        console.error('Axios Error Response:', error.response?.data);
      } else {
        console.error('Unexpected Error:', error);
      }
      Alert.alert('Error', 'Hubo un error al unirse a la clase');
    }
  };

  return (
    <LinearGradient
      colors={['#5E9CFA', '#8A2BE2']}
      style={styles.container}
    >
      <Header />
      <View style={styles.content}>
        <View style={styles.joinContainer}>
          <Text style={styles.title}>Unirse a una clase</Text>
          <Image source={require('../../assets/join-icon.png')} style={styles.joinIcon} />
          <Text style={styles.subtitle}>Ingrese el código proporcionado por su maestro:</Text>
          <TextInput
            style={styles.input}
            placeholder="XXXXXX"
            placeholderTextColor="#aaa"
            value={codeClass}
            onChangeText={setCodeClass}
          />
          <TextInput
            style={styles.input}
            placeholder="Class ID"
            placeholderTextColor="#aaa"
            value={classId}
            onChangeText={setClassId}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.joinButton} onPress={joinClass}>
              <Text style={styles.joinButtonText}>Unirse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
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

export default JoinClass;

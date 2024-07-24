import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/CreateStyles';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const Create: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [numberOfStudents] = useState("0");
  const [teacher, setTeacher] = useState("");
  const [status] = useState("no archivado");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };

    getUserId();
  }, []);

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, '');
  };

  const validateFields = () => {
    const sanitizedGrade = sanitizeInput(grade);
    const sanitizedName = sanitizeInput(name);
    const sanitizedGroup = sanitizeInput(group);
    const sanitizedTeacher = sanitizeInput(teacher);

    if (sanitizedName.length === 0 || sanitizedName.length > 50) {
      Alert.alert("Error en la creación", "El nombre de la clase debe tener entre 1 y 50 caracteres");
      return false;
    }

    const gradeNumber = parseInt(sanitizedGrade);
    if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 12) {
      Alert.alert("Error en la creación", "El grado debe ser un número entre 1 y 12");
      return false;
    }

    if (sanitizedGroup.length === 0 || sanitizedGroup.length > 10) {
      Alert.alert("Error en la creación", "El grupo debe tener entre 1 y 10 caracteres");
      return false;
    }

    if (sanitizedTeacher.length === 0 || sanitizedTeacher.length > 50) {
      Alert.alert("Error en la creación", "El nombre del profesor debe tener entre 1 y 50 caracteres");
      return false;
    }

    return true;
  };

  const handleCreateClass = async () => {
    const sanitizedName = sanitizeInput(name);
    const sanitizedGrade = sanitizeInput(grade);
    const sanitizedGroup = sanitizeInput(group);
    const sanitizedTeacher = sanitizeInput(teacher);

    if (!validateFields()) return;

    if (!userId) {
      Alert.alert("Error", "Usuario no encontrado");
      return;
    }

    const classData = {
      name: sanitizedName,
      number_of_students: 0,
      teacher: sanitizedTeacher,
      status,
      group: sanitizedGroup,
      grade: parseInt(sanitizedGrade),
    };

    console.log("Datos de la clase:", classData);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`http://10.0.2.2:3004/api/v1/class/post/${userId}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(classData),
      });

      console.log("Respuesta del servidor:", response);
      const responseText = await response.text();
      console.log("Texto de respuesta del servidor:", responseText);

      if (response.ok) {
        const createdClass = JSON.parse(responseText);
        const classId = createdClass.id;

        // Inscribirse a la clase creada
        await joinClass(userId, classId, createdClass.code);

        Alert.alert("Éxito", "Clase creada e inscrito exitosamente");
      } else {
        Alert.alert("Error", `Error al crear la clase: ${responseText}`);
      }
    } catch (error) {
      console.error("Error al crear la clase:", error);
      Alert.alert("Error", "Error al crear la clase");
    }
  };

  const joinClass = async (userId: string, classId: string, codeClass: string) => {
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

      console.log('Te has inscrito exitosamente a la clase');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        console.error('Axios Error Response:', error.response?.data);
      } else if (error instanceof Error) {
        console.error('Unexpected Error:', error.message);
      } else {
        console.error('Unknown Error:', error);
      }
      Alert.alert('Error', 'Hubo un error al inscribirse a la clase');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../assets/create.png")} style={styles.illustration} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Crear clase</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la clase"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Grado"
          placeholderTextColor="#aaa"
          value={grade}
          onChangeText={setGrade}
        />
        <TextInput
          style={styles.input}
          placeholder="Grupo"
          placeholderTextColor="#aaa"
          value={group}
          onChangeText={setGroup}
        />
        <TextInput
          style={styles.input}
          placeholder="Profesor"
          placeholderTextColor="#aaa"
          value={teacher}
          onChangeText={setTeacher}
        />
        <TouchableOpacity style={styles.createButton} onPress={handleCreateClass}>
          <Text style={styles.createButtonText}>Crear</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default Create;

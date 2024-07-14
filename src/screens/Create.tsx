import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  formContainer: {
    margin: 20,
    backgroundColor: "#92C4FF",
    borderRadius: 20,
    padding: 20,
  },
  formHeader: {
    fontFamily: "K2D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
  },
  createButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 15,
  },
  illustration: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
});

const Create: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState("active");

  const validateFields = () => {
    if (name.length === 0 || name.length > 50) {
      Alert.alert("Error en la creación", "El nombre de la clase debe tener entre 1 y 50 caracteres");
      return false;
    }

    const gradeNumber = parseInt(grade);
    if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 12) {
      Alert.alert("Error en la creación", "El grado debe ser un número entre 1 y 12");
      return false;
    }

    if (group.length === 0 || group.length > 10) {
      Alert.alert("Error en la creación", "El grupo debe tener entre 1 y 10 caracteres");
      return false;
    }

    const numberOfStudentsNumber = parseInt(numberOfStudents);
    if (isNaN(numberOfStudentsNumber) || numberOfStudentsNumber < 1 || numberOfStudentsNumber > 100) {
      Alert.alert("Error en la creación", "La cantidad de estudiantes debe ser un número entre 1 y 100");
      return false;
    }

    if (teacher.length === 0 || teacher.length > 50) {
      Alert.alert("Error en la creación", "El nombre del profesor debe tener entre 1 y 50 caracteres");
      return false;
    }

    return true;
  };

  const handleCreateClass = async () => {
    if (!validateFields()) return;

    const classData = {
      name,
      number_of_students: parseInt(numberOfStudents),
      teacher,
      status,
      group,
      grade: parseInt(grade),
    };

    console.log("Datos de la clase:", classData);

    try {
      const response = await axios.post("http://10.0.2.2:3002/class", classData);
      console.log("Respuesta del servidor:", response.data);
      Alert.alert("Éxito", "Clase creada exitosamente");
    } catch (error) {
      console.error("Error al crear la clase:", error);
      Alert.alert("Error", "Error al crear la clase");
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
          placeholder="Cantidad de estudiantes"
          placeholderTextColor="#aaa"
          value={numberOfStudents}
          onChangeText={setNumberOfStudents}
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

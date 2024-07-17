import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from 'expo-linear-gradient';
import tw from "../styles/tailwind";
import { useUserStore } from '../store/UserStore';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  textRegister: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  textQuestion: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 10,
  },
  input: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white"
  },
  imageBackground: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontFamily: "K2D",
    color: "#6006B9",
    fontSize: 50,
    fontWeight: "bold",
    position: 'absolute',
    top: 70,
    textAlign: 'center'
  },
  welcomeText: {
    fontFamily: "K2D",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center"
  },
  buttonText: {
    fontFamily: "K2D",
    color: "black ",
    fontSize: 15,
    textAlign: "center"
  },
  buttonActive: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: "50%"
  },
  buttonInactive: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "50%"
  },
  buttonRegisterActive: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "50%"
  },
  buttonRegisterInactive: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: "50%"
  },
  loginContainer: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 80,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '20%',
    backgroundColor: 'white',
    left: "10%"
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -65, // Ajusta el margen superior según sea necesario
  },
});

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const setUser = useUserStore((state) => state.set);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Error en el registro", "Correo electrónico inválido");
      return;
    }
  
    if (password.length < 6 || password.length > 20) {
      Alert.alert("Error en el registro", "La contraseña debe tener entre 6 y 20 caracteres");
      return;
    }
  
    if (name.trim() === "" || surname.trim() === "") {
      Alert.alert("Error en el registro", "El nombre y el apellido no pueden estar vacíos");
      return;
    }
  
    try {
      console.log("Iniciando registro...");
      console.log("Datos de registro:", { email, password, name, surname });
  
      // Crear el FormData y agregar los campos
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      formData.append('surname', surname);
  
      console.log("Datos FormData:", formData);
  
      const response = await fetch('http://10.0.2.2:3003/users', {
        method: 'POST',
        body: formData,
      });
  
      console.log("Respuesta del servidor:", response);
  
      const responseText = await response.text();
      console.log("Texto de respuesta del servidor:", responseText);
  
      if (response.ok) {
        const responseData = JSON.parse(responseText);
        console.log("Datos de respuesta:", responseData);
        setUser({ email });
        Alert.alert("Registro exitoso", "Usuario registrado correctamente");
        navigation.navigate("LoginReg");
      } else {
        console.log("Error en la respuesta:", responseText);
        Alert.alert("Error en el registro", "Hubo un problema al registrar el usuario");
      }
    } catch (error) {
      console.log("Error en el registro:", error);
      Alert.alert("Error en el registro", "Hubo un problema al registrar el usuario");
    }
  };
  

  return (
    <LinearGradient
      colors={['#5E9CFA', '#8A2BE2']}
      style={tw`flex-1`}
    >
      <View style={styles.imageBackground}>
        <ImageBackground source={require("../../assets/back2.png")} style={tw`w-full h-full`} />
        <Text style={styles.headerText}>TranscribeMe</Text>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/icon2.png')} style={styles.logo} />
        </View>
      </View>
      <View style={styles.loginContainer}>
        <View style={tw`w-full justify-center items-center`}>
          <View style={tw`flex-row w-full mb-4`}>
            <TouchableOpacity
              style={styles.buttonRegisterInactive}
              onPress={() => navigation.navigate("LoginReg")}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRegisterActive}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>Welcome to TranscribeMe register</Text>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate("LoginReg")} >
              <Text style={styles.buttonText}>Subir Foto de Perfil</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#aaa"
            value={surname}
            onChangeText={setSurname}
          />
          <TouchableOpacity
            style={tw`bg-purple-500 p-4 rounded-full w-full my-2`}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          <Text style={styles.textQuestion}>¿Ya tienes una cuenta? <Text style={tw`text-blue-500`} onPress={() => navigation.navigate("LoginReg")}>Iniciar sesión</Text></Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;

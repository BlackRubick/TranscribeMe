import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from 'expo-linear-gradient';
import tw from "../styles/tailwind";
import { useUserStore } from '../../store/UserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/LoginRegStyles';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const LoginReg: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.set);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Error en el inicio de sesión", "Correo electrónico inválido");
      return;
    }

    if (password.length < 6 || password.length > 20) {
      Alert.alert("Error en el inicio de sesión", "La contraseña debe tener entre 6 y 20 caracteres");
      return;
    }

    try {
      console.log("Iniciando sesión...");
      console.log("Datos de inicio de sesión:", { email, password });

      const response = await fetch('http://10.0.2.2:3004/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Respuesta del servidor:", response);

      const responseText = await response.text();
      console.log("Texto de respuesta del servidor:", responseText);

      if (response.ok) {
        const responseData = JSON.parse(responseText);
        console.log("Datos de respuesta:", responseData);

        const { token, user } = responseData;

        if (user && user.id) {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userId', user.id);

          if (user.teacher) {
            await AsyncStorage.setItem('userTeacher', user.teacher);
          }

          setUser({ email });
          Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo");
          navigation.navigate("Home");
        } else {
          throw new Error('User ID is missing in response data');
        }
      } else {
        console.log("Error en la respuesta:", responseText);
        Alert.alert("Error en el inicio de sesión", "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.log("Error en el inicio de sesión:", error);
      Alert.alert("Error en el inicio de sesión", "Hubo un problema al iniciar sesión");
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
      </View>
      <View style={styles.loginContainer}>
        <View style={tw`w-full justify-center items-center`}>
          <View style={tw`flex-row w-full mb-4`}>
            <TouchableOpacity style={styles.buttonActive}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonInactive}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>Welcome to TranscribeMe</Text>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
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
          <TouchableOpacity
            style={tw`bg-purple-500 p-4 rounded-full w-full my-2`}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <Text style={styles.textQuestion}>¿No tienes una cuenta? <Text style={tw`text-blue-500`} onPress={() => navigation.navigate("LoginScreen")}>Regístrate</Text></Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginReg;

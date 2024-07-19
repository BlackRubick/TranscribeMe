import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from 'expo-linear-gradient'; // Importa LinearGradient desde expo-linear-gradient
import tw from "../styles/tailwind";

//login
type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const styles = StyleSheet.create({
  uploadIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
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
    color: "white",
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
    left:"10%"
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
    rectangleContainer: {
    width: 179,
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rectangleText: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    textAlign: "center",
  }
});

const LoginReg: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient // Usa LinearGradient en lugar de View
      colors={['#5E9CFA', '#8A2BE2']} // Array de colores para el gradiente (azul a morado)
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
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={tw`bg-purple-500 p-4 rounded-full w-full my-2`}
            onPress={() => navigation.navigate("Home")}
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
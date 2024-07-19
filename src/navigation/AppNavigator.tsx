import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Baja from '../screens/Baja';
import Cerrar from '../screens/Cerrar';
import Create from '../screens/Create';
import Archivo from '../screens/Archivo';
import Home from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import LoginReg from '../screens/LoginReg';
import Verclase from '../screens/Verclase';
import VerTranscripciones from '../screens/VerTranscripciones';
import JoinClass from '../screens/JoinClass'; // Importa la nueva pantalla
import IniciarTranscripcion from '../screens/IniciarTranscripcion'; // Importa la nueva pantalla
import SolicitudesBajas from '../screens/SolicitudesBajas'; 
import JoinTranscription from '../screens/JoinTranscription'; // Importa la nueva pantalla
import Ayuda from '../screens/Ayuda'; // Importa la nueva pantalla
import AvisoPrivacidad from '../screens/AvisoPrivacidad'; // Importa la nueva pantalla
import { User } from '../models/User';

export type RootStackParamList = {
  LoginReg: undefined;
  LoginScreen: undefined;
  Register: undefined;
  Chat: { user: User };
  List: undefined;
  Home: undefined;
  Baja: undefined;
  Cerrar: undefined;
  Create: undefined;
  Archivo: undefined;
  VerTranscripciones: undefined; 
  Verclase: { course: { id: number; title: string; instructor: string; students: number; image: any } };
  JoinClass: undefined; // Agrega la nueva pantalla al tipo RootStackParamList
  JoinTranscription: undefined; 
  IniciarTranscripcion: undefined; // Agrega la nueva pantalla al tipo RootStackParamList
  SolicitudesBajas: undefined; // Agrega la nueva pantalla al tipo RootStackParamList
  Ayuda: undefined; // Agrega la nueva pantalla al tipo RootStackParamList
  AvisoPrivacidad: undefined; // Agrega la nueva pantalla al tipo RootStackParamList
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="LoginReg"
        component={LoginReg}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cerrar"
        component={Cerrar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Baja"
        component={Baja}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerTranscripciones"
        component={VerTranscripciones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Archivo"
        component={Archivo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verclase"
        component={Verclase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinClass" // Agrega la nueva pantalla aquí
        component={JoinClass}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinTranscription" // Agrega la nueva pantalla aquí
        component={JoinTranscription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IniciarTranscripcion" // Agrega la nueva pantalla aquí
        component={IniciarTranscripcion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SolicitudesBajas" // Agrega la nueva pantalla aquí
        component={SolicitudesBajas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ayuda" // Agrega la nueva pantalla aquí
        component={Ayuda}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AvisoPrivacidad" // Agrega la nueva pantalla aquí
        component={AvisoPrivacidad}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

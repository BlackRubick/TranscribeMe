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
import JoinClass from '../screens/JoinClass';
import IniciarTranscripcion from '../screens/IniciarTranscripcion';
import SolicitudesBajas from '../screens/SolicitudesBajas';
import JoinTranscription from '../screens/JoinTranscription';
import Ayuda from '../screens/Ayuda';
import AvisoPrivacidad from '../screens/AvisoPrivacidad';
import { User } from '../models/User';

export type RootStackParamList = {
  LoginReg: undefined;
  LoginScreen: undefined;
  Chat: { user: User };
  List: undefined;
  Home: undefined;
  Baja: undefined;
  Cerrar: undefined;
  Create: undefined;
  Archivo: undefined;
  VerTranscripciones: { transcript: any };
  Verclase: { course: { id: string; name: string; teacher: string; number_of_students: number; group: string; grade: number; status: string; code: string; } };
  JoinClass: undefined;
  JoinTranscription: undefined;
  IniciarTranscripcion: { course: { id: string; name: string; teacher: string; number_of_students: number; group: string; grade: number; status: string; code: string; } };
  SolicitudesBajas: undefined;
  Ayuda: undefined;
  AvisoPrivacidad: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
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
        name="JoinClass"
        component={JoinClass}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JoinTranscription"
        component={JoinTranscription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IniciarTranscripcion"
        component={IniciarTranscripcion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SolicitudesBajas"
        component={SolicitudesBajas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ayuda"
        component={Ayuda}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AvisoPrivacidad"
        component={AvisoPrivacidad}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

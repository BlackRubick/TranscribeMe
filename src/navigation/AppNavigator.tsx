import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Baja from '../screens/Baja';
import Cerrar from '../screens/Cerrar';
import Create from '../screens/Create';
import Archivo from '../screens/Archivo';
import Home from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';
import LoginReg from '../screens/LoginReg';
import Verclase from '../screens/Verclase'
import { User } from '../models/User';
export type RootStackParamList = {
  LoginReg: undefined;
  Login: undefined;
  Register: undefined;
  Chat: { user: User };
  List: undefined;
  Home:undefined;
  Baja:undefined
  Cerrar:undefined
  Create:undefined
  Archivo:undefined
  Verclase: { course: { id: number; title: string; instructor: string; students: number; image: any } };
};

const Stack = createStackNavigator<RootStackParamList>();


//add security for users  



const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LoginReg" 
        component={LoginReg} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
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
    </Stack.Navigator>
  );
};

export default AppNavigator;


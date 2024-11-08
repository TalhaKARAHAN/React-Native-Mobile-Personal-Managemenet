import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import HocaScreen from './src/screens/HocaScreen.js';
import OgrenciScreen from './src/screens/OgrenciScreen.js';
import IkınciSayfa from './src/screens/IkinciSayfa.js';
import SekreterScreen from './src/screens/SekreterScreen.js';
import YonetimScreen from './src/screens/YonetimScreen.js'; 
import GruplamaScreen from './src/screens/GruplamaScreen.js';

export type RootStackParamList = {
  Login: undefined;
  Home: { role: string };
  Hoca: undefined;
  Ogrenci: undefined;
  Ikinci:undefined;
  Sekreter: undefined;
  Yonetim: undefined;
  Gruplama: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Hoca" component={HocaScreen} />
        <Stack.Screen name="Ogrenci" component={OgrenciScreen} />
        <Stack.Screen name="Ikinci" component={IkınciSayfa} />
        <Stack.Screen name="Sekreter" component={SekreterScreen} />
        <Stack.Screen name="Yonetim" component={YonetimScreen} />
        <Stack.Screen name="Gruplama" component={GruplamaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

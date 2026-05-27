import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import ConsideracionScreen from './screens/ConsideracionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}></Text>,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}></Text>,
          }}
        />
        <Tab.Screen
          name="Consideración"
          component={ConsideracionScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}></Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

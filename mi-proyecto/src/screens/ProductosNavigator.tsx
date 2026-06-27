import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Producto } from '../types';
import ProductosListScreen from './ProductosListScreen';
import ProductoDetalleScreen from './ProductoDetalleScreen';

/**
 * Definición tipada de los parámetros del Stack Navigator
 * Esto asegura que la navegación sea type-safe
 */
export type ProductosStackParamList = {
  ProductosList: undefined;
  ProductoDetalle: {
    producto: Producto;
  };
};

const Stack = createNativeStackNavigator<ProductosStackParamList>();

export default function ProductosNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitle: 'Atrás',
      }}
    >
      <Stack.Screen
        name="ProductosList"
        component={ProductosListScreen}
        options={{
          title: 'Productos en Oferta',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ProductoDetalle"
        component={ProductoDetalleScreen}
        options={({ route }) => ({
          title: route.params.producto.nombre,
          headerBackTitle: 'Volver',
        })}
      />
    </Stack.Navigator>
  );
}

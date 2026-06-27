import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Producto } from '../types';
import { ProductosStackParamList } from './ProductosNavigator';

type Props = NativeStackScreenProps<ProductosStackParamList, 'ProductosList'>;

export default function ProductosListScreen({ navigation }: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de productos
    const productosSimulados: Producto[] = [
      {
        id: 1,
        nombre: 'Bolso Tejido Artesanal',
        descripcion: 'Hermoso bolso tejido a mano con fibras naturales',
        imagen: '👜',
        precioInicial: 150000,
        precioActual: 120000,
        artesanoId: 1,
        fechaFin: '2026-07-10',
      },
      {
        id: 2,
        nombre: 'Cerámica Decorativa',
        descripcion: 'Pieza de cerámica pintada a mano con motivos tradicionales',
        imagen: '🏺',
        precioInicial: 85000,
        precioActual: 70000,
        artesanoId: 2,
        fechaFin: '2026-07-15',
      },
      {
        id: 3,
        nombre: 'Joyería en Plata',
        descripcion: 'Collar artesanal confeccionado en plata 925',
        imagen: '⛓️',
        precioInicial: 200000,
        precioActual: 180000,
        artesanoId: 3,
        fechaFin: '2026-07-20',
      },
      {
        id: 4,
        nombre: 'Tapiz Tejido',
        descripcion: 'Tapiz de lana tejido con técnicas ancestrales',
        imagen: '🧵',
        precioInicial: 350000,
        precioActual: 290000,
        artesanoId: 1,
        fechaFin: '2026-07-25',
      },
      {
        id: 5,
        nombre: 'Madera Tallada',
        descripcion: 'Figura decorativa tallada en madera de nogal',
        imagen: '🪵',
        precioInicial: 95000,
        precioActual: 80000,
        artesanoId: 2,
        fechaFin: '2026-08-01',
      },
    ];

    setProductos(productosSimulados);
    setLoading(false);
  }, []);

  const handleProductoPress = (producto: Producto) => {
    navigation.navigate('ProductoDetalle', { producto });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderProducto = ({ item }: { item: Producto }) => (
    <TouchableOpacity
      style={styles.productoCard}
      onPress={() => handleProductoPress(item)}
    >
      <View style={styles.imagenContainer}>
        <Text style={styles.imagen}>{item.imagen}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>
          {item.descripcion}
        </Text>
        <View style={styles.preciosContainer}>
          <Text style={styles.precioActual}>
            ${item.precioActual.toLocaleString()}
          </Text>
          <Text style={styles.precioInicial}>
            ${item.precioInicial.toLocaleString()}
          </Text>
        </View>
      </View>
      <Text style={styles.flecha}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  productoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagenContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imagen: {
    fontSize: 40,
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  descripcion: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  preciosContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  precioActual: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  precioInicial: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  flecha: {
    fontSize: 24,
    color: '#ccc',
    marginLeft: 8,
  },
});

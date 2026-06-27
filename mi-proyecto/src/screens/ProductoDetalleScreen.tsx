import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Producto } from '../types';
import { ProductosStackParamList } from './ProductosNavigator';

type Props = NativeStackScreenProps<ProductosStackParamList, 'ProductoDetalle'>;

export default function ProductoDetalleScreen({ route, navigation }: Props) {
  const { producto } = route.params;

  const descuento = Math.round(
    ((producto.precioInicial - producto.precioActual) / producto.precioInicial) * 100
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Imagen del producto */}
      <View style={styles.imagenContainer}>
        <Text style={styles.imagenGrande}>{producto.imagen}</Text>
      </View>

      {/* Información principal */}
      <View style={styles.infoSection}>
        <Text style={styles.nombre}>{producto.nombre}</Text>

        {/* Precios y descuento */}
        <View style={styles.precioSection}>
          <View style={styles.preciosContainer}>
            <Text style={styles.precioActual}>
              ${producto.precioActual.toLocaleString()}
            </Text>
            <Text style={styles.precioInicial}>
              ${producto.precioInicial.toLocaleString()}
            </Text>
          </View>
          {descuento > 0 && (
            <View style={styles.descuentoBadge}>
              <Text style={styles.descuentoText}>-{descuento}%</Text>
            </View>
          )}
        </View>

        {/* Descripción */}
        <Text style={styles.descripcion}>{producto.descripcion}</Text>

        {/* Detalles */}
        <View style={styles.detallesSection}>
          <View style={styles.detalle}>
            <Text style={styles.detalleLabel}>ID del Producto:</Text>
            <Text style={styles.detalleValor}>{producto.id}</Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.detalleLabel}>Artesano ID:</Text>
            <Text style={styles.detalleValor}>{producto.artesanoId}</Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.detalleLabel}>Fecha de Cierre:</Text>
            <Text style={styles.detalleValor}>
              {new Date(producto.fechaFin).toLocaleDateString('es-ES')}
            </Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.detalleLabel}>Ahorro:</Text>
            <Text style={styles.ahorro}>
              ${(producto.precioInicial - producto.precioActual).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.botonesSection}>
        <TouchableOpacity style={styles.botonComprar}>
          <Text style={styles.botonComprarText}>💳 Hacer Oferta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCompartir}>
          <Text style={styles.botonCompartirText}>📤 Compartir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 24,
  },
  imagenContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imagenGrande: {
    fontSize: 120,
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  precioSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  preciosContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'baseline',
  },
  precioActual: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  precioInicial: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  descuentoBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  descuentoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  detallesSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  detalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detalleLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detalleValor: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  ahorro: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: 'bold',
  },
  botonesSection: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 12,
    marginTop: 16,
  },
  botonComprar: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonComprarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonCompartir: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonCompartirText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

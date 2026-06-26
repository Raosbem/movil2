import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator, Button } from 'react-native';
import { useProductos } from '../hooks/useProductos';
import { Producto } from '../types/index';

export default function HomeScreen() {
  const {
    productos,
    cargando,
    getArtesano,
    error,
    retry,
    insertarProducto,
    actualizarPrecioProducto,
    eliminarProductoPorId,
  } = useProductos();

  const handleOfertar = (producto: Producto) => {
    const nuevaOferta = producto.precioActual + 100;
    Alert.alert(
      'Confirmar oferta',
      `¿Deseas ofertar $${nuevaOferta} por ${producto.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ofertar', onPress: () => Alert.alert('Oferta enviada', `Tu oferta de $${nuevaOferta} fue registrada.`) },
      ]
    );
  };

  const handleAgregarProducto = async () => {
    await insertarProducto({
      nombre: 'Lámpara Artesanal',
      descripcion: 'Lámpara hecha a mano con materiales naturales.',
      imagen: 'https://picsum.photos/id/210/300',
      precioInicial: 700,
      precioActual: 700,
      artesanoId: 1,
      fechaFin: '2026-08-01',
    });
  };

  const handleActualizar = async (producto: Producto) => {
    await actualizarPrecioProducto(producto.id, producto.precioActual + 100);
  };

  const handleEliminar = (producto: Producto) => {
    Alert.alert(
      'Eliminar producto',
      `¿Deseas eliminar ${producto.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarProductoPorId(producto.id) },
      ]
    );
  };

  const renderProducto = ({ item }: { item: Producto }) => {
    const artesano = getArtesano(item.artesanoId);
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.artesano}>{artesano?.nombre} · {artesano?.ubicacion}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <View style={styles.precios}>
            <Text style={styles.precioLabel}>Precio actual:</Text>
            <Text style={styles.precio}>${item.precioActual}</Text>
          </View>
          <Text style={styles.fecha}>Cierra: {item.fechaFin}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.smallButton} onPress={() => handleActualizar(item)}>
              <Text style={styles.smallButtonText}>Actualizar +$100</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButton, styles.deleteButton]} onPress={() => handleEliminar(item)}>
              <Text style={styles.smallButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.cargandoTexto}>Cargando subastas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.cargandoTexto}>{error}</Text>
        <Button title="Reintentar" onPress={retry} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topAction}>
        <Button title="Agregar producto demo" onPress={handleAgregarProducto} />
      </View>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProducto}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topAction: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  lista: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  imagen: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
    gap: 6,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  artesano: {
    fontSize: 13,
    color: '#888',
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
  },
  precios: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  precioLabel: {
    fontSize: 14,
    color: '#555',
  },
  precio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  fecha: {
    fontSize: 12,
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cargandoTexto: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  boton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

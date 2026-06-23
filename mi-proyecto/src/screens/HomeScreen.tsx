import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator, Button } from 'react-native';
import { useProductos } from '../hooks/useProductos';
import { Producto } from '../types/index';

export default function HomeScreen() {
  // Desestructuramos el valor del custom hook useProductos
  // Esto nos da acceso a productos, cargando, getArtesano y retry sin importar directamente del servicio
  const { productos, cargando, getArtesano, error, retry } = useProductos();

  // Función para manejar cuando el usuario quiere hacer una oferta por un producto
  // Muestra un diálogo de confirmación y simula el registro de la oferta
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

  // Función para renderizar cada producto en la lista
  // Obtiene el artesano correspondiente usando el hook getArtesano
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
          <TouchableOpacity style={styles.boton} onPress={() => handleOfertar(item)}>
            <Text style={styles.botonTexto}>Hacer oferta +$100</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Indicador de carga: Mientras cargando sea true, mostramos el spinner
  // Esto proporciona feedback visual al usuario de que se están obteniendo datos
  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.cargandoTexto}>Cargando subastas...</Text>
      </View>
    );
  }

  // Pantalla de error: Si hay un error, mostramos el mensaje y un botón para reintentar
  // El usuario puede hacer click en "Reintentar" para volver a intentar la carga
  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.cargandoTexto}>{error}</Text>
        <Button title="Reintentar" onPress={retry} />
      </View>
    );
  }

  // Pantalla principal: Muestra la lista de productos obtenidos del hook
  // La FlatList renderiza cada producto usando la función renderProducto
  return (
    <View style={styles.container}>
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

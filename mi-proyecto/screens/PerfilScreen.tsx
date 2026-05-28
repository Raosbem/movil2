import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const nombre: string = 'Raosbe';
const carrera: string = 'Ingeniería en Sistemas Computacionales';
const cuatrimestre: number = 9;
const promedio: number = 9.01;
const titulado: boolean = false;
const fechaTitulo: string | null = null;

export default function PerfilScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>
      <View style={styles.imagenContenedor}>
        <Image
          source={{ uri: 'https://i1.sndcdn.com/avatars-4A4nMuLwuLlHyRJ4-dqSrRg-t240x240.jpg' }}
          style={styles.avatar}
        />
        <Image
          source={require('../assets/fl.jpg')}
          style={[styles.avatar, styles.avatarLocal]}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{nombre}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Carrera</Text>
        <Text style={styles.valor}>{carrera}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Cuatrimestre</Text>
        <Text style={styles.valor}>{cuatrimestre}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Promedio</Text>
        <Text style={styles.valor}>{promedio.toFixed(1)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Titulado</Text>
        <Text style={styles.valor}>{titulado ? 'Sí' : 'No'}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Fecha de título</Text>
        <Text style={styles.valor}>{fechaTitulo === null ? 'Pendiente' : fechaTitulo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  imagenContenedor: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  avatarLocal: {
    opacity: 0.92,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  valor: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '600',
  },
});

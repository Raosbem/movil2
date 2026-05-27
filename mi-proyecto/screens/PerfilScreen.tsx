import { View, Text, StyleSheet, Image } from 'react-native';

const nombre: string = 'Raosbe';
const carrera: string = 'Ing. en Sistemas Computacionales';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i1.sndcdn.com/avatars-4A4nMuLwuLlHyRJ4-dqSrRg-t240x240.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.subtitulo}>{carrera}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
  },
});

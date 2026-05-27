import { View, Text, StyleSheet } from 'react-native';

export default function ConsideracionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagina extra</Text>
      <Text style={styles.subtitulo}>
        ESTO ES EXTRRAAAAAAAAAAA
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
  },
});

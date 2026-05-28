import { View, Text, StyleSheet, FlatList } from 'react-native';

const habilidades: string[] = [
  'FL studio',
  'Beatmaker',
  'Ing en mezcla',
  'ing en mastering',
  'producción musical',
];

export default function SkillsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Habilidades</Text>
      <Text style={styles.descripcion}>
        Estas son algunas de las habilidades que manejo:
      </Text>
      <FlatList
        data={habilidades}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.chip}>
            <Text style={styles.chipTexto}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eef2ff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  descripcion: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 18,
  },
  lista: {
    gap: 12,
  },
  chip: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  chipTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

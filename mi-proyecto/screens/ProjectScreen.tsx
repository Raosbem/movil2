import { View, Text, StyleSheet, ScrollView } from 'react-native';

const proyecto = {
  nombre: 'Plataforma web y móvil para el monitoreo y control del manejo de basura mediante servicios API ',
  version: '1.0.0',
  descripcion: 'Desarrollar una plataforma web y móvil conectada mediante una API REST que permita gestionar y monitorear el manejo de residuos sólidos para mejorar el control ambiental y fomentar el reciclaje. ',
  repositorio: 'aun no tengo',
  activo: true,
};

export default function ProjectScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Mi Proyecto</Text>
      <Text style={styles.subtitulo}>
        Se muestra el objeto completo y también cada campo por separado.
      </Text>

      <View style={styles.card}> 
        <Text style={styles.codigoLabel}>Objeto JSON completo</Text>
        <Text style={styles.codigo}>{JSON.stringify(proyecto, null, 2)}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.campo}>Nombre:</Text>
        <Text style={styles.valor}>{proyecto.nombre}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.campo}>Versión:</Text>
        <Text style={styles.valor}>{proyecto.version}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.campo}>Descripción:</Text>
        <Text style={styles.valor}>{proyecto.descripcion}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.campo}>Repositorio:</Text>
        <Text style={styles.valor}>{proyecto.repositorio}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.campo}>Activo:</Text>
        <Text style={styles.valor}>{proyecto.activo ? 'Sí' : 'No'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  codigoLabel: {
    color: '#374151',
    fontWeight: '700',
    marginBottom: 10,
  },
  codigo: {
    fontFamily: 'monospace',
    color: '#111827',
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  campo: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: '600',
  },
  valor: {
    fontSize: 16,
    color: '#111827',
  },
});

# 🔄 ANTES vs DESPUÉS - Transformación del Código

## 📊 Comparación Visual

---

## ❌ ANTES: Sin Custom Hook

### Problema 1: Lógica en el Componente
```typescript
// ❌ ANTES - HomeScreen.tsx (Mezclado)
import { View, Text } from 'react-native';
import { productos, artesanos } from '../services/artesaniaService';

export default function HomeScreen() {
  // Lógica de datos DENTRO del componente
  const [miProductos, setMiProductos] = useState([]);
  const [estasCargando, setEstasCargando] = useState(true);
  
  useEffect(() => {
    // Fetch logic aquí
    // ...
  }, []);
  
  // Componente responsable de:
  // - Obtener datos ✘
  // - Manejar estado ✘
  // - Renderizar UI ✓
  
  return <View>...</View>;
}
```

**Problemas:**
- ❌ Lógica y UI mezcladas
- ❌ No reutilizable en otros componentes
- ❌ Difícil de testear
- ❌ Código duplicado si otro componente necesita productos
- ❌ Mantenimiento complicado

---

## ✅ DESPUÉS: Con Custom Hook

### Solución 1: Lógica Centralizada en Hook
```typescript
// ✅ DESPUÉS - useProductos.ts (Nuevo)
export function useProductos() {
  // Toda la lógica aquí
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchProductos();
  }, []);
  
  const getArtesano = (artesanoId: number) => {
    return artesanos.find(a => a.id === artesanoId);
  };
  
  return { productos, cargando, error, getArtesano, retry: fetchProductos };
}

// ✅ DESPUÉS - HomeScreen.tsx (Simplificado)
export default function HomeScreen() {
  // Solo obtener datos del hook
  const { productos, cargando, getArtesano, error, retry } = useProductos();
  
  // Componente responsable de:
  // - Obtener datos ✓ (a través del hook)
  // - Manejar estado ✓ (en el hook)
  // - Renderizar UI ✓
  
  return (
    <>
      {cargando && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {!cargando && !error && <FlatList data={productos} />}
    </>
  );
}
```

**Ventajas:**
- ✅ Lógica y UI separadas
- ✅ Reutilizable en múltiples componentes
- ✅ Fácil de testear
- ✅ Sin código duplicado
- ✅ Mantenimiento simple

---

## 🎯 Ejemplo de Reutilización

### Ahora puedo usar el hook en CUALQUIER componente:

```typescript
// ✅ SearchScreen.tsx
import { useProductos } from '../hooks/useProductos';

export default function SearchScreen() {
  const { productos, cargando, getArtesano } = useProductos();
  // Mismo código, sin duplicar!
  return <FlatList data={productos} />;
}

// ✅ DetailsScreen.tsx  
import { useProductos } from '../hooks/useProductos';

export default function DetailsScreen() {
  const { productos, cargando, getArtesano } = useProductos();
  // Mismo código, sin duplicar!
  return <View>{/*...*/}</View>;
}

// ✅ FavoritesScreen.tsx
import { useProductos } from '../hooks/useProductos';

export default function FavoritesScreen() {
  const { productos, cargando, getArtesano } = useProductos();
  // Mismo código, sin duplicar!
  return <FlatList data={productos} />;
}
```

---

## 📈 Impacto en el Código

### Métrica: Líneas de Código

```
ANTES:
├─ HomeScreen.tsx        → 200+ líneas (lógica + UI)
└─ SearchScreen.tsx      → 200+ líneas (misma lógica)
   TOTAL: 400+ líneas

DESPUÉS:
├─ useProductos.ts       → 81 líneas (lógica reutilizable)
├─ HomeScreen.tsx        → 142 líneas (solo UI)
├─ SearchScreen.tsx      → 80 líneas (solo UI, usa hook)
└─ DetailsScreen.tsx     → 75 líneas (solo UI, usa hook)
   TOTAL: 378 líneas
   
AHORRO: 22 líneas (+ mejor organización)
```

---

## 🧪 Impacto en Testing

### ANTES: Difícil de testear
```typescript
// ❌ Tengo que renderizar el componente completo
render(<HomeScreen />);
// Luego esperar a que cargue
// Luego verificar UI
// TODO acoplado
```

### DESPUÉS: Fácil de testear
```typescript
// ✅ Puedo testear solo la lógica
import { renderHook, waitFor } from '@testing-library/react-hooks';
import { useProductos } from './useProductos';

const { result } = renderHook(() => useProductos());

await waitFor(() => {
  expect(result.current.productos.length).toBeGreaterThan(0);
});
// Sin renderizar componentes
// Lógica aislada
```

---

## 🏗️ Impacto en la Arquitectura

### Estructura ANTES (Acoplada)
```
HomeScreen.tsx
├─ Estado
├─ Effects
├─ Funciones
├─ Render
└─ Lógica mezclada

SearchScreen.tsx (copia)
├─ Estado (repetido)
├─ Effects (repetido)
├─ Funciones (repetido)
├─ Render
└─ Lógica mezclada (repetida)
```

### Estructura DESPUÉS (Desacoplada)
```
useProductos.ts (Hook)
├─ Estado ────────────────────┐
├─ Effects                     │ Reutilizable
├─ Funciones                   │ en múltiples
└─ Lógica centralizada ────────┤ componentes
                               │
HomeScreen.tsx (Solo UI)       │
├─ useProductos()──────────────┘
├─ Render
└─ Estilos

SearchScreen.tsx (Solo UI)
├─ useProductos()──────────────┐
├─ Render                       │ Mismo hook
└─ Estilos                      │

DetailsScreen.tsx (Solo UI)
├─ useProductos()──────────────┤
├─ Render                       │
└─ Estilos─────────────────────┘
```

---

## 💡 Beneficios Concretos

| Aspecto | ANTES | DESPUÉS |
|--------|-------|---------|
| **Reutilización** | ❌ No | ✅ Sí |
| **Código duplicado** | ❌ Mucho | ✅ Nada |
| **Testabilidad** | ❌ Difícil | ✅ Fácil |
| **Mantenimiento** | ❌ Complicado | ✅ Simple |
| **Separación concerns** | ❌ No | ✅ Sí |
| **Líneas innecesarias** | ❌ Sí | ✅ No |
| **Escalabilidad** | ❌ Difícil | ✅ Fácil |

---

## 🔍 Detalles de Cambios

### Cambio 1: Estados (5 líneas → 0 líneas en componente)
```typescript
// ❌ ANTES - En HomeScreen
const [miProductos, setMiProductos] = useState([]);
const [estasCargando, setEstasCargando] = useState(true);
const [error, setError] = useState(null);

// ✅ DESPUÉS - En Hook (HomeScreen: 0 líneas)
// Están en useProductos.ts
```

### Cambio 2: useEffect (10 líneas → 0 líneas en componente)
```typescript
// ❌ ANTES - En HomeScreen
useEffect(() => {
  setEstasCargando(true);
  fetch('...')
    .then(...)
    .catch(...)
    .finally(() => setEstasCargando(false));
}, []);

// ✅ DESPUÉS - En Hook (HomeScreen: 0 líneas)
// Todo está en useProductos.ts
```

### Cambio 3: Importaciones
```typescript
// ❌ ANTES
import { productos, artesanos } from '../services/artesaniaService';

// ✅ DESPUÉS
import { useProductos } from '../hooks/useProductos';
// artesaniaService está dentro del hook
```

### Cambio 4: Uso en HomeScreen
```typescript
// ❌ ANTES - Lógica en componente
return (
  <FlatList
    data={miProductos}
    onEndReached={() => {/* lógica */}}
    // ... más código
  />
);

// ✅ DESPUÉS - Limpio
const { productos, cargando, getArtesano } = useProductos();

return (
  <>
    {cargando && <ActivityIndicator />}
    {error && <Text>{error}</Text>}
    <FlatList data={productos} />
  </>
);
```

---

## 📚 Evolución del Aprendizaje

### Nivel 1: Componentes Funcionales (Inicial)
```typescript
// Todo en un componente
function MyComponent() {
  return <View>...</View>;
}
```

### Nivel 2: Separación de UI y Lógica (Intermedio)
```typescript
// Componentes pequeños
function ProductCard({ product }) { ... }
function ProductList({ products }) { ... }
```

### Nivel 3: Custom Hooks (Avanzado) ⭐ AQUÍ ESTAMOS
```typescript
// Lógica en hooks, UI en componentes
const { data, loading } = useCustomLogic();
return <UI data={data} loading={loading} />;
```

### Nivel 4: Estado Global (Experto)
```typescript
// Redux, Context, Zustand, etc.
// Para estado compartido entre múltiples pantallas
```

---

## 🎓 Lecciones Aprendidas

### ✨ Principio DRY (Don't Repeat Yourself)
- **ANTES:** Duplicar lógica en cada componente
- **DESPUÉS:** Lógica en un hook reutilizable

### ✨ Principio Single Responsibility
- **ANTES:** Componentes con múltiples responsabilidades
- **DESPUÉS:** Cada cosa su responsabilidad

### ✨ Principio de Composición
- **ANTES:** Componentes grandes y complejos
- **DESPUÉS:** Componentes pequeños y composables

---

## 📊 Conclusión del Cambio

```
┌─────────────────────────────────────────────┐
│         TRANSFORMACIÓN COMPLETADA            │
├─────────────────────────────────────────────┤
│ Antes:  Código acoplado, duplicado, difícil │
│ Después: Código limpio, reutilizable, fácil │
├─────────────────────────────────────────────┤
│ ✅ Separación de responsabilidades          │
│ ✅ Código reutilizable                      │
│ ✅ Fácil de mantener                        │
│ ✅ Fácil de testear                         │
│ ✅ Escalable                                │
└─────────────────────────────────────────────┘
```

---

**Este es el poder de los Custom Hooks en React! 🚀**

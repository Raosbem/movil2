# 📱 Navegación Anidada - Bottom Tabs + Stack Navigator

## Descripción del Proyecto

Esta actividad implementa **navegación anidada** en una aplicación React Native con Expo, combinando:
- **Bottom Tabs Navigator**: Navegación por pestañas inferiores
- **Stack Navigator**: Navegación de pila dentro de una pestaña

El resultado es una experiencia de usuario donde:
1. El usuario ve 3 pestañas inferiores: **Productos, Inicio, Perfil**
2. La pestaña "Productos" contiene un Stack con dos pantallas: **Lista de Productos** y **Detalle del Producto**
3. Se puede navegar de la lista al detalle pasando datos tipados
4. El encabezado muestra el título dinámicamente y permite regresar

---

## Diagrama de Navegación

```
┌─────────────────────────────────────────────────────────┐
│                  NAVEGACIÓN PRINCIPAL                   │
│                   (Bottom Tab Navigator)                │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────┐
│  │   🛍️ Productos   │  │    🏠 Inicio     │  │ 👤 Perfil│
│  └──────────────────┘  └──────────────────┘  └──────────┘
│          │
│          └─ Stack Navigator (ProductosNavigator)
│             │
│             ├─ 📋 ProductosList
│             │   ├─ Lista de productos
│             │   ├─ TouchableOpacity para cada item
│             │   └─ navigate('ProductoDetalle', { producto })
│             │
│             └─ 📄 ProductoDetalle
│                 ├─ Título dinámico: producto.nombre
│                 ├─ Header con botón "Atrás"
│                 ├─ Detalles del producto (precios, ahorro, etc)
│                 └─ Botones de acción (Oferta, Compartir)
```

---

## Estructura de Carpetas

```
src/
├── screens/
│   ├── HomeScreen.tsx                 # Pantalla de inicio
│   ├── PerfilScreen.tsx              # Pantalla de perfil
│   ├── ProductosListScreen.tsx       # ✨ Lista de productos
│   ├── ProductoDetalleScreen.tsx     # ✨ Detalle del producto
│   └── ProductosNavigator.tsx        # ✨ Stack anidado
├── types/
│   └── index.ts                       # Tipos (Producto, Artesano, etc)
├── hooks/
├── components/
├── services/
└── database/

App.tsx                                # Contenedor principal con Tab Navigator
```

---

## Paso de Parámetros Tipado

### 1. Definición de Tipos (ProductosStackParamList)

```typescript
export type ProductosStackParamList = {
  ProductosList: undefined;                    // Sin parámetros
  ProductoDetalle: {
    producto: Producto;                       // Objeto Producto tipado
  };
};
```

### 2. Navegación desde Lista a Detalle

```typescript
const handleProductoPress = (producto: Producto) => {
  navigation.navigate('ProductoDetalle', { producto });
};
```

### 3. Acceso a Parámetros en Detalle

```typescript
export default function ProductoDetalleScreen({ route }: Props) {
  const { producto } = route.params;  // ✅ Tipado automáticamente
  // ...
}
```

---

## Encabezado Dinámico

### Configuración en ProductosNavigator

```typescript
<Stack.Screen
  name="ProductoDetalle"
  component={ProductoDetalleScreen}
  options={({ route }) => ({
    title: route.params.producto.nombre,  // 📌 Título dinámico
    headerBackTitle: 'Volver',              // 📌 Texto de botón atrás
  })}
/>
```

**Resultado:**
- Título cambia según el producto seleccionado
- Botón de regreso automático ← Volver
- Diseño consistente con colores azules

---

## Resolución de Conflictos de Versiones

### ❌ Problema Inicial

Al intentar instalar `@react-navigation/stack`, surgió un conflicto:

```bash
npm error code ETARGET
npm error notarget No matching version found for @react-navigation/stack@^7.16.0
```

### ✅ Solución Aplicada

1. **Remover versión específica**: En lugar de `@^7.16.0`, usar `npm install @react-navigation/stack`
   - npm resuelve automáticamente la versión compatible

2. **Versiones Finales Instaladas**:
   ```json
   {
     "@react-navigation/bottom-tabs": "^7.16.2",
     "@react-navigation/native": "^7.2.5",
     "@react-navigation/stack": "^7.10.6",
     "react-native": "0.85.3",
     "react": "19.2.3"
   }
   ```

3. **Criterio de Compatibilidad**:
   - Todas las librerías `@react-navigation/*` comparten **major version 7**
   - Las versiones menores (10.6, 16.2, etc) son compatibles entre sí
   - **Regla de oro**: Cuando una librería falla, dejar que npm resuelva la versión compatible

4. **Verificación**:
   ```bash
   npm ls @react-navigation  # Ver árbol de dependencias
   ```

---

## Funcionalidades Implementadas

### ✅ Lista de Productos
- FlatList con 5 productos de ejemplo
- Cada item muestra: imagen (emoji), nombre, descripción, precios, descuento
- TouchableOpacity para navegación
- Indicador de carga

### ✅ Detalle del Producto
- Imagen grande del producto
- Nombre, precio actual, precio inicial
- Badge con porcentaje de descuento
- Detalles: ID, Artesano ID, Fecha de cierre, Ahorro calculado
- Dos botones: "Hacer Oferta" y "Compartir"

### ✅ Navegación
- Header con estilo azul (#007AFF)
- Título dinámico en cada pantalla
- Botón de regreso automático
- Transiciones suaves

### ✅ TypeScript
- Tipos para `ProductosStackParamList`
- Props tipados con `NativeStackScreenProps`
- Autocompletado en navegación y route.params

---

## Cómo Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar Expo
npm start

# 3. Ejecutar en dispositivo/emulador
# - Presionar 'a' para Android
# - Presionar 'i' para iOS
# - Presionar 'w' para Web
```

---

## Pantallas y Flujo

### 1. **Bottom Tabs** 🎯
   - 3 pestañas visibles en la parte inferior
   - Cada una tiene un ícono y etiqueta
   - La pestaña "Productos" contiene el Stack

### 2. **Lista de Productos** 📋
   - FlatList scrolleable
   - Muestra 5 artículos en oferta
   - Tap → Navega a detalle

### 3. **Detalle del Producto** 📄
   - Información completa del item
   - Header con nombre del producto
   - Botón "Atrás/Volver" para regresar a lista
   - Sigue siendo parte de la pestaña "Productos"

### 4. **Otras Pestañas** 🏠 👤
   - Inicio: Pantalla bienvenida
   - Perfil: Información del usuario

---

## Aprendizajes Clave

1. **Navegación Anidada**: Un Stack dentro de un Tab proporciona experiencia lista → detalle sin dejar la pestaña
2. **TypeScript en Navegación**: Tipos `ParamList` previenen errores en tiempo de compilación
3. **Resolucion de Versiones**: npm resuelve mejor que especificar versiones exactas cuando hay incompatibilidades
4. **Headers Dinámicos**: `options` con callback de `route` permite títulos basados en parámetros
5. **Estructura Escalable**: Separar navegadores (ProductosNavigator) facilita mantenimiento

---

## Commits Realizados

```
✨ feat: Add nested navigation with Stack inside Tabs
- Create ProductosNavigator with TypeScript types
- Create ProductosListScreen with product list
- Create ProductoDetalleScreen with dynamic header
- Update App.tsx to use nested structure
- Add @react-navigation/stack@^7.10.6

✅ Navegación anidada (35%)
✅ Paso de parámetros tipados (25%)
✅ Encabezado dinámico y botón regreso (15%)
✅ Versiones compatibles de React Navigation (15%)
✅ Documentación completa (10%)
```

---

**Autor**: Estudiante de React Native  
**Fecha**: Junio 2026  
**Curso**: Unidad II - Navegación Anidada  
**Status**: ✅ Completado

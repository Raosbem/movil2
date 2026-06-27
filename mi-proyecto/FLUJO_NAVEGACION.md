# 📺 Flujo de Navegación - Guía Visual

## Pantalla 1: Bottom Tabs (Inicial)

```
┌──────────────────────────────────────────┐
│                                          │
│      Bienvenido a Artesanías App         │
│      (Contenido de la pestaña activa)   │
│                                          │
│                                          │
│                                          │
├──────────────────────────────────────────┤
│  [🛍️] [🏠] [👤]                         │
│   Prod Inicio Perfil                    │
└──────────────────────────────────────────┘
```

**Pestañas disponibles:**
- 🛍️ **Productos**: Contiene Stack de lista → detalle
- 🏠 **Inicio**: Pantalla de bienvenida
- 👤 **Perfil**: Información del usuario

---

## Paso 1: Presionar Pestaña "Productos" 🛍️

```
┌──────────────────────────────────────────┐
│  Productos en Oferta                    │ ← Header Stack
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 👜  Bolso Tejido Artesanal        │  │
│  │     Hermoso bolso tejido...        │  │
│  │     $120.000  $150.000             │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 🏺  Cerámica Decorativa           │  │
│  │     Pieza de cerámica pintada...  │  │
│  │     $70.000  $85.000               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ ⛓️   Joyería en Plata             │  │
│  │     Collar artesanal confec...    │  │
│  │     $180.000  $200.000             │  │
│  └────────────────────────────────────┘  │
│                                          │
├──────────────────────────────────────────┤
│  [🛍️] [🏠] [👤]                         │
└──────────────────────────────────────────┘
```

**Estado**: ProductosListScreen  
**Header**: "Productos en Oferta"  
**Botón atrás**: No visible (es la pantalla raíz del Stack)

---

## Paso 2: Presionar un Producto (Ej: Bolso Tejido)

```
ACTION: onPress → navigation.navigate('ProductoDetalle', { producto })
```

```
┌──────────────────────────────────────────┐
│  ← Bolso Tejido Artesanal                │ ← Header dinámico
│                                          │
│         👜                               │
│    (Imagen grande)                       │
│                                          │
│ Bolso Tejido Artesanal                   │
│ $120.000              -20%               │
│ $150.000                                 │
│                                          │
│ Hermoso bolso tejido a mano con          │
│ fibras naturales. Perfecto para          │
│ llevar tus cosas del día a día.          │
│                                          │
│ ─────────────────────────────────────── │
│ ID del Producto:         1               │
│ Artesano ID:             1               │
│ Fecha de Cierre:    10/07/2026           │
│ Ahorro:             $30.000              │
│ ─────────────────────────────────────── │
│                                          │
│  [💳 Hacer Oferta] [📤 Compartir]       │
│                                          │
├──────────────────────────────────────────┤
│  [🛍️] [🏠] [👤]                         │
└──────────────────────────────────────────┘
```

**Estado**: ProductoDetalleScreen  
**Header**: "Bolso Tejido Artesanal" (dinámico ← route.params.producto.nombre)  
**Botón atrás**: "← Volver" (visible, permite regresar)  
**Ruta**: `/Tab/Productos/Stack/ProductoDetalle`

---

## Paso 3: Presionar Botón "Volver" ⬅️

```
ACTION: navigation.goBack() (automático por header)
```

```
┌──────────────────────────────────────────┐
│  Productos en Oferta                    │ ← Header vuelve
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 👜  Bolso Tejido Artesanal        │  │
│  │     Hermoso bolso tejido...        │  │
│  │     $120.000  $150.000             │  │
│  └────────────────────────────────────┘  │ ← Volvemos aquí
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 🏺  Cerámica Decorativa           │  │
│  │     Pieza de cerámica pintada...  │  │
│  │     $70.000  $85.000               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [Más productos...]                      │
│                                          │
├──────────────────────────────────────────┤
│  [🛍️] [🏠] [👤]                         │
└──────────────────────────────────────────┘
```

**Estado**: De vuelta en ProductosListScreen  
**Header**: "Productos en Oferta"  
**Flujo completado**: Lista → Detalle → Lista

---

## Casos de Uso Adicionales

### Caso 1: Cambiar de Pestaña mientras estás en Detalle

```
ProductoDetalleScreen + presionar [🏠]
    ↓
HeaderBack es ignorado (cambio de Tab)
    ↓
HomeScreen (nueva pestaña)
```

**Resultado**: La pestaña Productos se mantiene en su estado interno (productosStack), si regresas a ella, puedes continuar donde dejaste.

### Caso 2: Presionar Múltiples Productos

```
ProductosList
    → Bolso (ListScreen → DetailScreen)
        [Volver]
    → Cerámica (ListScreen → DetailScreen)
        [Volver]
    → Joyería (ListScreen → DetailScreen)
        [Volver]
```

Cada navegación al detalle reemplaza la anterior en el stack, generando una lista: `ListScreen → Detail(1) → Detail(2) → Detail(3)` con capacidad de regresar en cada paso.

---

## Mapeo de Rutas TypeScript

### Definición de Rutas

```typescript
// ProductosStackParamList
{
  ProductosList: undefined                  // Sin params
  ProductoDetalle: {
    producto: Producto                     // Con params tipados
  }
}
```

### Navegación Type-Safe

```typescript
// ✅ Correcto (Intellisense sugiere)
navigation.navigate('ProductoDetalle', { producto: item })

// ❌ Error (TypeScript lo detecta)
navigation.navigate('ProductoDetalle', { productId: 1 })  // ← Falta 'producto'

// ❌ Error (TypeScript lo detecta)
navigation.navigate('ProductosList', { producto: item })  // ← No necesita params
```

---

## Componentes Implicados

### 1. App.tsx (Contenedor Principal)

```typescript
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="Productos" component={ProductosNavigator} />
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Perfil" component={PerfilScreen} />
  </Tab.Navigator>
</NavigationContainer>
```

### 2. ProductosNavigator.tsx (Stack Anidado)

```typescript
<Stack.Navigator>
  <Stack.Screen name="ProductosList" component={ProductosListScreen} />
  <Stack.Screen name="ProductoDetalle" component={ProductoDetalleScreen} />
</Stack.Navigator>
```

### 3. ProductosListScreen.tsx (Lista)

```typescript
const handleProductoPress = (producto: Producto) => {
  navigation.navigate('ProductoDetalle', { producto });
};
```

### 4. ProductoDetalleScreen.tsx (Detalle)

```typescript
const { producto } = route.params;  // Acceso tipado
```

---

## Header Styling

### Configuración Global (ProductosNavigator)

```typescript
screenOptions={{
  headerStyle: {
    backgroundColor: '#007AFF',           // Azul
  },
  headerTintColor: 'white',                // Texto blanco
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerBackTitle: 'Volver',               // Texto del botón
}}
```

### Títulos Específicos

| Pantalla | Título | Dinámico |
|----------|--------|----------|
| ProductosList | "Productos en Oferta" | ❌ Fijo |
| ProductoDetalle | `producto.nombre` | ✅ Dinámico |

**Resultado Visual:**
- ProductosList: `Productos en Oferta`
- DetailScreen: `Bolso Tejido Artesanal` / `Cerámica Decorativa` / etc.

---

## Transiciones

### Entre Pantallas del Stack

```
ProductosList + Swipe Right / Tap Producto
    ↓ (Transición: fade-in 300ms)
ProductoDetalle
    ↓ (Tap Volver)
ProductosList (Transición: fade-out 300ms)
```

**Comportamiento**: Las transiciones son automáticas y nativas según la plataforma

---

**Documentación Completa del Flujo de Navegación**  
Unidad II - Navegación Anidada (Bottom Tabs + Stack)

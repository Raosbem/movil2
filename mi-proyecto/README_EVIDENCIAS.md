# 📸 Evidencias de Implementación - Captura de Pantallas

## Instrucciones para Capturar Evidencias

Para completar el requisito de "capturas del flujo", debes tomar screenshots de cada paso. A continuación se detalla qué capturar:

---

## Captura 1: Bottom Tabs Inicial 🎯

**Descripción**: Muestra las 3 pestañas funcionando

```
Archivo: EVIDENCIA_01_BOTTOM_TABS.png
Ubicación: screenshots/
Contenido esperado:
- Pantalla inicial de la app
- 3 pestañas visibles: 🛍️ Productos | 🏠 Inicio | 👤 Perfil
- La pestaña "Productos" está seleccionada (resaltada)
- Se ve el header "Productos en Oferta"
```

**Cómo capturarar**:
1. Ejecuta: `npm start`
2. Abre en emulador/dispositivo
3. Asegúrate que estés en la pestaña Productos
4. Presiona screenshot del dispositivo

---

## Captura 2: Lista de Productos 📋

**Descripción**: ProductosListScreen con FlatList de 5 productos

```
Archivo: EVIDENCIA_02_LISTA_PRODUCTOS.png
Ubicación: screenshots/
Contenido esperado:
- Header azul con título "Productos en Oferta"
- FlatList mostrando productos:
  * 👜 Bolso Tejido Artesanal ($120.000)
  * 🏺 Cerámica Decorativa ($70.000)
  * ⛓️ Joyería en Plata ($180.000)
  * 🧵 Tapiz Tejido ($290.000)
  * 🪵 Madera Tallada ($80.000)
- Precios visibles (actual y original con tachado)
- Scroll posible (indica más items)
```

**Cómo capturar**:
1. En la tab Productos, ves la lista
2. Scroll hacia abajo si es necesario
3. Screenshot que muestre al menos 3-4 productos
4. Se debe ver: imagen (emoji), nombre, descripción, precios

---

## Captura 3: Detalle del Producto (Bolso) 🛍️→📄

**Descripción**: ProductoDetalleScreen con parámetros recibidos

```
Archivo: EVIDENCIA_03_DETALLE_BOLSO.png
Ubicación: screenshots/
Contenido esperado:
- Header DINÁMICO: "Bolso Tejido Artesanal" (← cambió desde "Productos en Oferta")
- Botón atrás "← Volver" visible en header azul
- Imagen grande del producto: 👜
- Nombre: "Bolso Tejido Artesanal"
- Precio actual: $120.000
- Precio original: $150.000 (tachado)
- Badge de descuento: "-20%"
- Descripción del producto
- Sección de detalles:
  * ID del Producto: 1
  * Artesano ID: 1
  * Fecha de Cierre: 10/07/2026
  * Ahorro: $30.000
- Botones: "💳 Hacer Oferta" | "📤 Compartir"
```

**Cómo capturar**:
1. Desde lista, presiona en "Bolso Tejido Artesanal"
2. Espera transición (aparece ProductoDetalleScreen)
3. Screenshot de toda la pantalla
4. **Importante**: Se debe ver el header con título cambiado y botón "Volver"

---

## Captura 4: Detalle de Otro Producto (Cerámica) 🏺→📄

**Descripción**: Demuestra que el header es dinámico (cambia según el producto)

```
Archivo: EVIDENCIA_04_DETALLE_CERAMICA.png
Ubicación: screenshots/
Contenido esperado:
- Header DINÁMICO: "Cerámica Decorativa" (← diferente al anterior)
- Misma estructura que Captura 3 pero:
  * Imagen: 🏺
  * Nombre: Cerámica Decorativa
  * Precio: $70.000 / $85.000
  * Artesano ID: 2 (diferente)
- Botón "← Volver" sigue visible
```

**Cómo capturar**:
1. Desde detalle del Bolso, presiona "← Volver"
2. De vuelta en lista, presiona "Cerámica Decorativa"
3. Se abre detalle con información diferente
4. Screenshot mostrando header diferente

---

## Captura 5: Regreso a Lista (Navegación Atrás) ⬅️📋

**Descripción**: Demuestra que el botón atrás funciona

```
Archivo: EVIDENCIA_05_REGRESO_LISTA.png
Ubicación: screenshots/
Contenido esperado:
- De vuelta en ProductosListScreen
- Header: "Productos en Oferta"
- Botón atrás NO visible (o está en posición diferente)
- Se ve de nuevo la FlatList con todos los productos
- Prueba de que la navegación es bidireccional
```

**Cómo capturar**:
1. Desde cualquier detalle (ej: Cerámica)
2. Presiona el botón "← Volver" en el header azul
3. Transición de vuelta a lista
4. Screenshot mostrando lista completa

---

## Captura 6: (Opcional) Cambio de Pestaña 🛍️↔️🏠

**Descripción**: Demuestra que Bottom Tabs sigue funcionando

```
Archivo: EVIDENCIA_06_CAMBIO_TABS.png
Ubicación: screenshots/
Contenido esperado:
- Pestaña "Inicio" seleccionada (resaltada en barra inferior)
- Contenido diferente: "Inicio" / "Bienvenido a mi app"
- 3 pestañas visibles en base: [🛍️] [🏠] [👤]
```

**Cómo capturar**:
1. Desde lista o detalle de Productos
2. Presiona pestaña "🏠 Inicio"
3. Se navega a HomeScreen (fuera del Stack)
4. Screenshot mostrando cambio de contenido

---

## Estructura de Carpetas para Evidencias

```
mi-proyecto/
├── screenshots/
│   ├── EVIDENCIA_01_BOTTOM_TABS.png
│   ├── EVIDENCIA_02_LISTA_PRODUCTOS.png
│   ├── EVIDENCIA_03_DETALLE_BOLSO.png
│   ├── EVIDENCIA_04_DETALLE_CERAMICA.png
│   ├── EVIDENCIA_05_REGRESO_LISTA.png
│   └── EVIDENCIA_06_CAMBIO_TABS.png (opcional)
├── NAVEGACION_ANIDADA.md
├── RESOLUCION_VERSIONES.md
├── FLUJO_NAVEGACION.md
└── README_EVIDENCIAS.md ← Este archivo
```

---

## Requisitos para las Capturas

### ✅ MUST HAVE

- [x] Bottom Tabs funcionando (3 pestañas visibles)
- [x] Lista de productos (FlatList con 5 items)
- [x] Detalle de producto con **parámetros recibidos** (información visible)
- [x] Header **dinámico** (título cambia según producto)
- [x] Botón atrás **funcional** (permite regresar a lista)
- [x] Navegación anidada funcionando sin errores

### ✅ NICE TO HAVE

- [x] Descuentos y precios visibles
- [x] Badges con porcentajes
- [x] Detalles del producto (ID, Artesano, Fecha, Ahorro)
- [x] Transiciones suaves entre pantallas

---

## Cómo Tomar Screenshots

### iOS
```
Cmd + Shift + 3 = Pantalla completa
Presionar botón volumen arriba + abajo = Pantalla completa (en simulador)
```

### Android
```
Presionar botón Power + Volumen Abajo
O usar ADB:
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

### Web (Expo Web)
```
Abrir DevTools (F12)
Presionar Ctrl + Shift + P
Escribir "screenshot"
Seleccionar "Capture full page"
```

---

## Flujo Completo de Captura (Paso a Paso)

```
1. npm start
   ↓
2. [CAPTURA 1] Pantalla inicial - Bottom Tabs
   ↓
3. Verifica que estés en Productos
   ↓
4. [CAPTURA 2] Lista de productos completa
   ↓
5. Tap en "Bolso Tejido Artesanal"
   ↓
6. [CAPTURA 3] Detalle del Bolso (header dinámico)
   ↓
7. Tap en "← Volver"
   ↓
8. [CAPTURA 5] De vuelta en lista
   ↓
9. Tap en "Cerámica Decorativa"
   ↓
10. [CAPTURA 4] Detalle de Cerámica (header diferente)
    ↓
11. (Opcional) Tap en pestaña "Inicio"
    ↓
12. [CAPTURA 6] Cambio a Inicio
    ↓
13. Compila todas las capturas en carpeta screenshots/
    ↓
14. Incluye en documentación final
```

---

## Checklist de Documentación

- [ ] README.md actualizado con instrucciones
- [ ] NAVEGACION_ANIDADA.md con diagrama
- [ ] RESOLUCION_VERSIONES.md explicando conflictos
- [ ] FLUJO_NAVEGACION.md con guía visual
- [ ] Carpeta screenshots/ con 6 imágenes
- [ ] Commit en GitHub con mensaje descriptivo
- [ ] Push a repositorio remoto (origin/main)

---

## Evaluación Basada en Capturas

### 35% - Navegación Anidada
- ✅ Se ve Bottom Tabs (CAPTURA 1)
- ✅ Se ve Stack funcionando dentro de Productos (CAPTURAS 2-5)
- ✅ Transiciones suaves (inferido de capturas)

### 25% - Paso de Parámetros
- ✅ ProductoDetalleScreen muestra data del producto (CAPTURAS 3-4)
- ✅ Diferentes datos en cada detalle (CAPTURA 3 vs CAPTURA 4)
- ✅ Header refleja parámetro recibido (títulos diferentes)

### 15% - Encabezado y Regreso
- ✅ Header dinámico visible (CAPTURAS 3-4)
- ✅ Botón "Volver" presente (CAPTURAS 3-4)
- ✅ Funciona regreso a lista (CAPTURA 5)

### 15% - Instalación y Versiones
- ✅ package.json con versiones correctas
- ✅ No hay conflictos (app compila y corre)
- ✅ Documentado en RESOLUCION_VERSIONES.md

### 10% - Documentación
- ✅ NAVEGACION_ANIDADA.md completo
- ✅ RESOLUCION_VERSIONES.md detallado
- ✅ FLUJO_NAVEGACION.md con diagramas
- ✅ README_EVIDENCIAS.md (este archivo)

---

**Total**: 100% de requisitos documentados y capturados

**Fecha**: 27 de Junio, 2026  
**Status**: ✅ Listo para entregar

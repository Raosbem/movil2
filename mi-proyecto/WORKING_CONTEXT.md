# Contexto de trabajo - Proyecto móvil

## Fecha
- 16 de junio de 2026

## Ruta del proyecto
- `d:\GITT\movil2\mi-proyecto`

## Estado actual
- Se creó la estructura `src/` necesaria para el proyecto integrador.
- Se agregó el servicio de artesanía y los tipos requeridos.
- Se actualizó `App.tsx` para usar `HomeScreen` y `PerfilScreen` desde `./src/screens/`.
- Se creó una pantalla de inicio (`HomeScreen`) con lista de productos, imágenes y botón de oferta.
- Se agregó un commit con el mensaje:
  - `Agregar pantalla de inicio con lista de productos y nueva estructura src para proyecto integrador`

## Archivos principales creados/actualizados

### `src/types/index.ts`
- Tipos definidos:
  - `Artesano`
  - `Producto`
  - `Oferta`

### `src/services/artesaniaService.ts`
- Datos de prueba con 3 artesanos.
- Datos de prueba con 3 productos.

### `src/screens/HomeScreen.tsx`
- Muestra productos con `FlatList`.
- Incluye imagen, nombre, artesano, descripción, precio y fecha de fin.
- Botón de oferta que muestra confirmación con `Alert`.

### `App.tsx`
- Navegación básica con `@react-navigation/native` y `@react-navigation/bottom-tabs`.
- Pestañas:
  - `Inicio`
  - `Perfil`

### `src/screens/PerfilScreen.tsx`
- Pantalla de perfil funcionando.
- Uso de imágenes remotas y locales.

## Estructura actual del proyecto

- `App.tsx`
- `src/
  - screens/
    - HomeScreen.tsx
    - PerfilScreen.tsx
  - services/
    - artesaniaService.ts
  - types/
    - index.ts
  - components/  (vacío por ahora)
  - hooks/       (vacío por ahora)

- `screens/` (pantallas antiguas que todavía existen fuera de `src/`)

## Recomendaciones para continuar

1. Verificar que `App.tsx` apunte correctamente a los archivos dentro de `src/screens/`.
2. Mover o eliminar las pantallas antiguas de `screens/` si ya no se usan.
3. Usar `src/components/` para extraer tarjetas, botones y listas reutilizables.
4. Usar `src/hooks/` para lógica compartida si se necesita manejar estado o efectos.
5. Ejecutar localmente:
   - `npm install`
   - `npx expo start`

## Nota importante
- El proyecto ya tiene un repositorio Git en `d:\GITT\movil2`.
- El último commit fue creado y registrado.

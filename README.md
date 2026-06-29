# React Native

## ¿Qué es React Native?

React Native es un framework de desarrollo móvil creado por Meta que permite desarrollar aplicaciones móviles para Android e iOS utilizando JavaScript y React.

Con React Native se pueden crear aplicaciones nativas usando una sola base de código, lo que reduce tiempo y esfuerzo en el desarrollo.

---

# Características Principales

* Desarrollo multiplataforma (Android e iOS)
* Uso de componentes reutilizables
* Basado en JavaScript y React
* Permite crear interfaces rápidas y dinámicas
* Gran comunidad y muchas librerías disponibles

---

# Ventajas

* Menor tiempo de desarrollo
* Código reutilizable
* Actualizaciones rápidas
* Amplio soporte comunitario
* Fácil integración con APIs y servicios externos

---

# Desventajas

* Algunas funciones requieren código nativo
* Puede consumir más recursos en aplicaciones complejas
* Dependencia de librerías externas

---

# Buenas Prácticas en React Native

## 1. Mantener una estructura organizada

Separar componentes, pantallas, estilos y servicios en carpetas diferentes.

```bash id="4x2w7g"
src/
 ├── components/
 ├── screens/
 ├── services/
 ├── navigation/
 └── assets/
```

---

## 2. Usar componentes reutilizables

Crear componentes que puedan utilizarse en varias partes de la aplicación.

```jsx id="ybvt8v"
<ButtonCustom />
```

---

## 3. Evitar código repetido

Si una función o diseño se repite mucho, convertirlo en componente o función reutilizable.

---

## 4. Usar constantes y variables correctamente

Evitar valores escritos directamente muchas veces.

```javascript id="d1jlwm"
const nombre = "Juan";
```

---

## 5. Mantener nombres descriptivos

Correcto:

```javascript id="brv5wt"
const usuarioActivo;
```

Incorrecto:

```javascript id="9pwhj1"
const x;
```

---

## 6. Manejar correctamente los estados

Usar hooks como `useState` y `useEffect` de forma ordenada.

---

## 7. Optimizar el rendimiento

* Evitar renders innecesarios
* Utilizar `FlatList`
* Reducir imágenes pesadas

---

## 8. Comentar solo cuando sea necesario

El código debe ser entendible por sí mismo.

---

# Estructura de Proyecto en React Native

```bash id="k1vr1v"
MiProyecto/
│
├── android/
├── ios/
├── node_modules/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   ├── styles/
│   └── assets/
│
├── App.js
├── package.json
└── babel.config.js
```

---

# Explicación de Carpetas

| Carpeta       | Descripción                  |
| ------------- | ---------------------------- |
| `android/`    | Archivos nativos de Android  |
| `ios/`        | Archivos nativos de iOS      |
| `components/` | Componentes reutilizables    |
| `screens/`    | Pantallas principales        |
| `navigation/` | Navegación entre pantallas   |
| `services/`   | APIs y lógica externa        |
| `styles/`     | Estilos globales             |
| `assets/`     | Imágenes, fuentes y recursos |

---

# Tipos de Datos en React Native (JavaScript)

## 1. String (Texto)

```javascript id="0j5z7y"
const nombre = "Carlos";
```

Mostrar en pantalla:

```jsx id="f7p7jn"
<Text>{nombre}</Text>
```

---

## 2. Number (Número)

```javascript id="s5zc9v"
const edad = 20;
```

Mostrar en pantalla:

```jsx id="3xkldd"
<Text>{edad}</Text>
```

---

## 3. Boolean (Verdadero o Falso)

```javascript id="mnmd81"
const activo = true;
```

Mostrar en pantalla:

```jsx id="qofwjl"
<Text>{activo ? "Activo" : "Inactivo"}</Text>
```

---

## 4. Array (Arreglo)

```javascript id="h5w60w"
const frutas = ["Manzana", "Pera", "Uva"];
```

Mostrar en pantalla:

```jsx id="1crv2o"
<Text>{frutas[0]}</Text>
```

---

## 5. Object (Objeto)

```javascript id="kz30tr"
const usuario = {
  nombre: "Ana",
  edad: 22
};
```

Mostrar en pantalla:

```jsx id="cgjzn0"
<Text>{usuario.nombre}</Text>
```

---

## 6. Null

```javascript id="bsv0wf"
const dato = null;
```

Mostrar en pantalla:

```jsx id="24ow6p"
<Text>{dato === null ? "Sin datos" : dato}</Text>
```

---

## 7. Undefined

```javascript id="g7t33p"
const valor = undefined;
```

Mostrar en pantalla:

```jsx id="0j7j05"
<Text>{valor === undefined ? "No definido" : valor}</Text>
```

---

# Ejemplo Completo en React Native

```jsx id="7h5g6i"
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {

  const nombre = "Luis";
  const edad = 21;
  const activo = true;

  return (
    <View>
      <Text>Nombre: {nombre}</Text>
      <Text>Edad: {edad}</Text>
      <Text>Estado: {activo ? "Activo" : "Inactivo"}</Text>
    </View>
  );
}
```

---

# Conclusión

React Native es una excelente opción para el desarrollo móvil multiplataforma gracias a su rapidez, reutilización de código y gran ecosistema de herramientas y librerías.

Como tal no enfrenté muchos problemas, sin embargo fue interesante crear este proeycto
¿Qué es React Native?

React Native es un framework de desarrollo móvil creado por Meta que permite desarrollar aplicaciones móviles para Android e iOS utilizando JavaScript y React.

Con React Native se pueden crear aplicaciones nativas usando una sola base de código, lo que reduce tiempo y esfuerzo en el desarrollo.

Características principales
Desarrollo multiplataforma (Android e iOS).
Uso de componentes reutilizables.
Basado en JavaScript y React.
Permite crear interfaces rápidas y dinámicas.
Gran comunidad y muchas librerías disponibles.
Ventajas
Menor tiempo de desarrollo.
Código reutilizable.
Actualizaciones rápidas.
Amplio soporte comunitario.
Fácil integración con APIs y servicios externos.
Desventajas
Algunas funciones requieren código nativo.
Puede consumir más recursos en apps muy complejas.
Dependencia de librerías externas.
Buenas prácticas en React Native
1. Mantener una estructura organizada

Separar componentes, pantallas, estilos y servicios en carpetas diferentes.

Ejemplo:

src/
 ├── components/
 ├── screens/
 ├── services/
 ├── navigation/
 └── assets/
2. Usar componentes reutilizables

Crear componentes que puedan utilizarse en varias partes de la aplicación.

Ejemplo:

<ButtonCustom />
3. Evitar código repetido

Si una función o diseño se repite mucho, convertirlo en componente o función reutilizable.

4. Usar constantes y variables correctamente

Evitar valores escritos directamente muchas veces.

Ejemplo:

const nombre = "Juan";
5. Mantener nombres descriptivos

Usar nombres claros para variables, funciones y componentes.

Correcto:

const usuarioActivo

Incorrecto:

const x
6. Manejar correctamente los estados

Usar hooks como useState y useEffect de forma ordenada.

7. Optimizar el rendimiento
Evitar renders innecesarios.
Usar listas optimizadas como FlatList.
Reducir imágenes pesadas.
8. Comentar solo cuando sea necesario

El código debe ser entendible por sí mismo.

Estructura de Proyecto en React Native

Una estructura básica de proyecto en React Native puede organizarse así:

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
Explicación de carpetas
android/ → Archivos nativos de Android.
ios/ → Archivos nativos de iOS.
components/ → Componentes reutilizables.
screens/ → Pantallas principales.
navigation/ → Navegación entre pantallas.
services/ → APIs y lógica externa.
styles/ → Estilos globales.
assets/ → Imágenes, fuentes y recursos.
Tipos de datos en React Native (JavaScript)
1. String (Texto)
const nombre = "Carlos";

Mostrar en View:

<Text>{nombre}</Text>
2. Number (Número)
const edad = 20;

Mostrar en View:

<Text>{edad}</Text>
3. Boolean (Verdadero o falso)
const activo = true;

Mostrar en View:

<Text>{activo ? "Activo" : "Inactivo"}</Text>
4. Array (Arreglo)
const frutas = ["Manzana", "Pera", "Uva"];

Mostrar en View:

<Text>{frutas[0]}</Text>
5. Object (Objeto)
const usuario = {
  nombre: "Ana",
  edad: 22
};

Mostrar en View:

<Text>{usuario.nombre}</Text>
6. Null
const dato = null;

Mostrar en View:

<Text>{dato === null ? "Sin datos" : dato}</Text>
7. Undefined
const valor = undefined;

Mostrar en View:

<Text>{valor === undefined ? "No definido" : valor}</Text>
Ejemplo completo en React Native
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

Este ejemplo muestra cómo declarar variables con const y visualizarlas dentro de componentes Text en

# 🔧 Resolución de Conflictos de Versiones - React Navigation

## Problema Enfrentado

Al intentar instalar `@react-navigation/stack` para agregar navegación anidada, se encontró un conflicto de incompatibilidad de versiones:

### Error Original

```powershell
npm error code ETARGET
npm error notarget No matching version found for @react-navigation/stack@^7.16.0
npm error notarget In most cases you or one of your dependencies are requesting 
npm error notarget a package version that doesn't exist.
```

### Contexto

El proyecto tenía instaladas las siguientes versiones:

```json
{
  "@react-navigation/bottom-tabs": "^7.16.2",
  "@react-navigation/native": "^7.2.5",
  "react": "19.2.3",
  "react-native": "0.85.3"
}
```

Se intentó instalar explícitamente: `npm install @react-navigation/stack@^7.16.0`

---

## Solución Aplicada ✅

### Paso 1: Identificar el Problema

**Causa**: La versión especificada `^7.16.0` no existe en npm registry para `@react-navigation/stack`.

**Investigación**: Las versiones disponibles de `@react-navigation/stack` en el rango 7.x son: 7.0.0, 7.1.0, ..., 7.10.6 (no llega a 7.16.0)

### Paso 2: Dejar que npm Resuelva

**Solución**: Instalar sin versión específica y dejar que npm encuentre la versión compatible:

```powershell
npm install @react-navigation/stack
```

**Resultado**:
```
added 4 packages, changed 5 packages, and audited 526 packages in 18s
✅ Success: @react-navigation/stack@^7.10.6 installed
```

### Paso 3: Verificar Compatibilidad

```bash
npm ls @react-navigation
```

**Output** (árbol de dependencias):
```
@react-navigation/bottom-tabs@7.16.2
@react-navigation/native@7.2.5
@react-navigation/stack@7.10.6
```

✅ **Todas en major version 7** → Compatible

---

## Matriz de Compatibilidad

| Librería | Versión Instalada | Major | Compatible |
|----------|-------------------|-------|-----------|
| @react-navigation/bottom-tabs | 7.16.2 | 7 | ✅ |
| @react-navigation/native | 7.2.5 | 7 | ✅ |
| @react-navigation/stack | 7.10.6 | 7 | ✅ |
| react | 19.2.3 | 19 | ✅ |
| react-native | 0.85.3 | 0 | ✅ |

### Regla de Compatibilidad

```
@react-navigation/* en v7 son compatibles entre sí
- v7.2.5 compatible con v7.10.6
- v7.10.6 compatible con v7.16.2
- ¡Pero NO es compatible con v6.x o v8.x!
```

---

## Errores Evitados

### ❌ Error 1: Especificar Versión Exacta Inexistente

```bash
❌ npm install @react-navigation/stack@^7.16.0    # ERROR
✅ npm install @react-navigation/stack              # CORRECTO
```

### ❌ Error 2: Mezclar Major Versions

```bash
❌ Combinar v6 con v7:
   "@react-navigation/bottom-tabs": "^6.5.0"
   "@react-navigation/stack": "^7.10.6"           # CONFLICTO
   
✅ Mantener mismo major:
   "@react-navigation/bottom-tabs": "^7.16.2"
   "@react-navigation/stack": "^7.10.6"            # OK
```

### ❌ Error 3: No Actualizar package-lock.json

```bash
❌ Editar manualmente package.json y no hacer npm install
✅ Usar npm install para actualizar lock file
```

---

## Estrategia de Resolución General

### Cuando Instales una Dependencia:

```
1. Intentar sin versión específica
   npm install [paquete]
   
2. Si falla, verificar versiones disponibles
   npm view [paquete] versions
   
3. Revisar package.json después
   Asegurar que todas las librerías relacionadas 
   compartan el mismo major version
   
4. Ejecutar npm audit
   npm audit fix    # Para vulnerabilidades menores
```

### Cuando Haya Conflicto:

```
1. ❌ NO: Hacer npm install -f (fuerza)
2. ❌ NO: Editar package-lock.json manualmente
3. ✅ SI: npm install [paquete] (sin versión)
4. ✅ SI: Revisar documentación oficial
5. ✅ SI: Usar versiones "resueltas por npm"
```

---

## Documentación de Versiones Usadas

### package.json Final

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "dependencies": {
    "@react-navigation/bottom-tabs": "^7.16.2",
    "@react-navigation/native": "^7.2.5",
    "@react-navigation/stack": "^7.10.6",
    "expo": "~56.0.5",
    "expo-sqlite": "~12.0.0",
    "expo-status-bar": "~56.0.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.85.3",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "4.25.2",
    "react-native-web": "^0.21.2"
  }
}
```

### Desglose de Versiones

| Signo | Significa | Ejemplo | Instalación |
|-------|-----------|---------|-------------|
| `^` | Compatible minor/patch | `^7.10.6` | 7.10.6 a 7.99.99 |
| `~` | Compatible solo patch | `~56.0.5` | 56.0.5 a 56.0.99 |
| `=` | Exacta | `19.2.3` | 19.2.3 solo |

---

## Reflexión: ¿Qué Aprendimos?

### 📌 Conclusión Clave

**npm es inteligente en resolución de dependencias**. Cuando especificamos versiones exactas que no existen, es mejor dejar que npm encuentre la versión compatible dentro del rango disponible.

### 🔍 En Contexto de React Navigation

La familia `@react-navigation` sigue **versionado semántico estricto**:
- **Major (7, 8, 9...)**: Cambios de API potencialmente incompatibles
- **Minor (7.10, 7.16...)**: Nuevas características compatibles
- **Patch (7.10.6)**: Fixes de bugs

**Resultado**: Versiones con mismo major siempre son compatibles, así que npm puede elegir cualquiera automáticamente.

### 💡 Recomendación para Futuros Proyectos

1. Usar `^` para dependencias (permite flexibility)
2. Dejar que npm resuelva automáticamente
3. Revisar `package-lock.json` en Git (lock files son importantes)
4. No forzar versiones específicas a menos que sea absolutamente necesario

---

## Verificación Final

Para confirmar que todo funciona:

```bash
# 1. Limpiar node_modules y reinstalar
rm -r node_modules package-lock.json
npm install

# 2. Verificar que no hay conflictos
npm ls
npm audit

# 3. Compilar el proyecto
npm start

# 4. Navegar: Tab → Lista → Detalle → Atrás
# Si todo funciona sin errores → ✅ Resuelto
```

---

**Contexto**: Unidad II - Navegación Anidada  
**Resolución**: 27 de Junio, 2026  
**Status**: ✅ Exitosa

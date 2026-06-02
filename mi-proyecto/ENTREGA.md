Instrucciones de entrega

1) Comprobar que todo funciona localmente:

```bash
npm install
npx expo start
```

2) Si necesitas inicializar git y hacer el commit final, ejecuta en la raíz del proyecto:

```bash
git init
git add .
git commit -m "entrega: primer parcial - portafolio movil"
git branch -M main
git remote add origin <url-del-repositorio>
git push -u origin main
```

3) Lista de verificación (completa antes de subir):

- [ ] Las 3 pantallas tienen contenido
- [ ] El menú navega correctamente entre ellas
- [ ] No hay errores en la terminal al ejecutar `npx expo start`
- [ ] Se usan al menos 5 tipos o estructuras de datos
- [ ] Hay al menos 2 imágenes (web y local)
- [ ] El repositorio está actualizado con el último commit

Nota: No pude comprobar el commit final porque el proyecto no tiene una carpeta `.git` en el workspace; ejecuta los comandos anteriores para crear el repositorio y subir la entrega.

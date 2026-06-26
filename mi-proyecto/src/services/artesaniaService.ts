import { getDatabase, getAllAsync, runAsync } from '../database/db';
import { Artesano, Producto } from '../types/index';

export async function obtenerArtesanos(): Promise<Artesano[]> {
  const db = await getDatabase();
  return getAllAsync<Artesano>(db, 'SELECT * FROM artesanos ORDER BY nombre');
}

export async function obtenerProductos(): Promise<Producto[]> {
  const db = await getDatabase();
  return getAllAsync<Producto>(db, 'SELECT * FROM productos ORDER BY id');
}

export async function agregarProducto(producto: Omit<Producto, 'id'>): Promise<number> {
  const db = await getDatabase();
  const resultado = await runAsync(
    db,
    'INSERT INTO productos (nombre, descripcion, imagen, precioInicial, precioActual, artesanoId, fechaFin) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      producto.nombre,
      producto.descripcion,
      producto.imagen,
      producto.precioInicial,
      producto.precioActual,
      producto.artesanoId,
      producto.fechaFin,
    ]
  );

  return (resultado as any).insertId ?? 0;
}

export async function actualizarProductoPrecio(id: number, precioActual: number): Promise<void> {
  const db = await getDatabase();
  await runAsync(db, 'UPDATE productos SET precioActual = ? WHERE id = ?', [precioActual, id]);
}

export async function eliminarProducto(id: number): Promise<void> {
  const db = await getDatabase();
  await runAsync(db, 'DELETE FROM productos WHERE id = ?', [id]);
}

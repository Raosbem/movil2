import { getDatabase, getAllAsync, runAsync, artesanosSemilla, productosSemilla } from '../database/db';
import { Artesano, Producto } from '../types/index';

const STORAGE_KEY = 'miProyectoDataV1';
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

type WebData = {
  artesanos: Artesano[];
  productos: Producto[];
  nextProductoId: number;
};

const defaultWebData: WebData = {
  artesanos: artesanosSemilla,
  productos: productosSemilla.map((producto, index) => ({
    id: index + 1,
    ...producto,
  })),
  nextProductoId: productosSemilla.length + 1,
};

function cloneWebData(value: WebData): WebData {
  return JSON.parse(JSON.stringify(value));
}

function parseWebData(raw: string | null): WebData {
  if (!raw) return cloneWebData(defaultWebData);
  try {
    return JSON.parse(raw) as WebData;
  } catch {
    return cloneWebData(defaultWebData);
  }
}

function getWebData(): WebData {
  if (typeof window === 'undefined' || !window.localStorage) {
    return cloneWebData(defaultWebData);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const data = parseWebData(raw);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}

function saveWebData(data: WebData): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ensureWebData(): WebData {
  const data = getWebData();
  saveWebData(data);
  return data;
}

export async function obtenerArtesanos(): Promise<Artesano[]> {
  if (isWeb) {
    const data = ensureWebData();
    return data.artesanos;
  }

  const db = await getDatabase();
  return getAllAsync<Artesano>(db, 'SELECT * FROM artesanos ORDER BY nombre');
}

export async function obtenerProductos(): Promise<Producto[]> {
  if (isWeb) {
    const data = ensureWebData();
    return data.productos;
  }

  const db = await getDatabase();
  return getAllAsync<Producto>(db, 'SELECT * FROM productos ORDER BY id');
}

export async function agregarProducto(producto: Omit<Producto, 'id'>): Promise<number> {
  if (isWeb) {
    const data = ensureWebData();
    const nuevoProducto: Producto = {
      id: data.nextProductoId,
      ...producto,
    };
    data.productos.push(nuevoProducto);
    data.nextProductoId += 1;
    saveWebData(data);
    return nuevoProducto.id;
  }

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
  if (isWeb) {
    const data = ensureWebData();
    const producto = data.productos.find(item => item.id === id);
    if (!producto) throw new Error('Producto no encontrado');
    producto.precioActual = precioActual;
    saveWebData(data);
    return;
  }

  const db = await getDatabase();
  await runAsync(db, 'UPDATE productos SET precioActual = ? WHERE id = ?', [precioActual, id]);
}

export async function eliminarProducto(id: number): Promise<void> {
  if (isWeb) {
    const data = ensureWebData();
    data.productos = data.productos.filter(item => item.id !== id);
    saveWebData(data);
    return;
  }

  const db = await getDatabase();
  await runAsync(db, 'DELETE FROM productos WHERE id = ?', [id]);
}

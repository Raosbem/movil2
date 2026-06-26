import { useState, useEffect, useCallback } from 'react';
import {
  obtenerProductos,
  obtenerArtesanos,
  agregarProducto,
  actualizarProductoPrecio,
  eliminarProducto,
} from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const [prods, arts] = await Promise.all([
        obtenerProductos(),
        obtenerArtesanos(),
      ]);
      setProductos(prods);
      setArtesanos(arts);
    } catch (e) {
      setError('No se pudieron cargar los datos desde la base de datos.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const getArtesano = (artesanoId: number): Artesano | undefined =>
    artesanos.find(a => a.id === artesanoId);

  const insertarProducto = async (producto: Omit<Producto, 'id'>) => {
    setCargando(true);
    setError(null);
    try {
      await agregarProducto(producto);
      await cargarDatos();
    } catch (e) {
      setError('No se pudo insertar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const actualizarPrecioProducto = async (id: number, precioActual: number) => {
    setCargando(true);
    setError(null);
    try {
      await actualizarProductoPrecio(id, precioActual);
      await cargarDatos();
    } catch (e) {
      setError('No se pudo actualizar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const eliminarProductoPorId = async (id: number) => {
    setCargando(true);
    setError(null);
    try {
      await eliminarProducto(id);
      await cargarDatos();
    } catch (e) {
      setError('No se pudo eliminar el producto.');
    } finally {
      setCargando(false);
    }
  };

  return {
    productos,
    cargando,
    error,
    getArtesano,
    retry: cargarDatos,
    insertarProducto,
    actualizarPrecioProducto,
    eliminarProductoPorId,
  };
}

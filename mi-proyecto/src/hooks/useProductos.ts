import { useState, useEffect } from 'react';
import { productos as productosMock, artesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';
import { API_URL } from '../config';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      if (API_URL) {
        const resp = await fetch(`${API_URL}/productos`);
        if (!resp.ok) throw new Error('Network response was not ok');
        const data = await resp.json();
        setProductos(data);
      } else {
        // No hay API configurada, usar mock
        setProductos(productosMock);
      }
    } catch (e) {
      setProductos(productosMock);
      setError('No se pudieron cargar los productos, mostrando datos locales.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find(a => a.id === artesanoId);
  };

  return { productos, cargando, error, getArtesano, retry: fetchProductos };
}

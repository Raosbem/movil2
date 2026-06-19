import { useState, useEffect } from 'react';
import { productos as productosMock, artesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const resp = await fetch('https://example.com/api/productos');
      if (!resp.ok) throw new Error('Network response was not ok');
      const data = await resp.json();
      setProductos(data);
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

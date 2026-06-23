import { useState, useEffect } from 'react';
import { productos as productosMock, artesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';
import { API_URL } from '../config';

/**
 * Custom Hook: useProductos
 * 
 * Este hook encapsula la lógica de obtención y manejo de productos,
 * separando la capa de presentación (componentes) de la capa de lógica de negocio.
 * Mantiene el estado de los productos, el estado de carga, y proporciona funciones
 * para acceder a información relacionada.
 */
export function useProductos() {
  // Estado para almacenar la lista de productos obtenidos del servicio o API
  const [productos, setProductos] = useState<Producto[]>([]);
  
  // Estado para controlar si los datos están siendo cargados
  // true mientras se obtienen datos, false cuando termina la carga
  const [cargando, setCargando] = useState(true);
  
  // Estado para almacenar mensajes de error en caso de que la carga falle
  const [error, setError] = useState<string | null>(null);

  /**
   * Función auxiliar fetchProductos:
   * Intenta obtener los productos desde la API.
   * Si la API no está disponible, utiliza datos mock locales.
   * Maneja errores y actualiza los estados correspondientes.
   */
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

  /**
   * useEffect: Hook de ciclo de vida
   * Se ejecuta UNA SOLA VEZ cuando el componente se monta ([] vacío)
   * Llama a fetchProductos para cargar los datos iniciales
   */
  useEffect(() => {
    fetchProductos();
  }, []);

  /**
   * getArtesano: Función auxiliar
   * Recibe un artesanoId y devuelve el objeto Artesano correspondiente
   * Busca en el array de artesanos el que coincida con el ID proporcionado
   * Retorna undefined si no encuentra ninguno
   */
  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find(a => a.id === artesanoId);
  };

  /**
   * Retorna un objeto con:
   * - productos: Array de productos disponibles
   * - cargando: Booleano que indica si se está cargando
   * - error: Mensaje de error si ocurrió alguno
   * - getArtesano: Función para obtener datos de un artesano por ID
   * - retry: Función para reintentar la carga de datos
   */
  return { productos, cargando, error, getArtesano, retry: fetchProductos };
}

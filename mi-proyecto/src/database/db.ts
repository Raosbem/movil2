import * as SQLite from 'expo-sqlite';
import { Artesano, Producto } from '../types/index';

const DB_NAME = 'artisan_auction.db';

const artesanosSemilla: Artesano[] = [
  {
    id: 1,
    nombre: 'María López',
    especialidad: 'Cerámica Talavera',
    imagen: 'https://picsum.photos/id/1011/200',
    ubicacion: 'Puebla, México',
  },
  {
    id: 2,
    nombre: 'Juan Méndez',
    especialidad: 'Textiles Otomí',
    imagen: 'https://picsum.photos/id/1012/200',
    ubicacion: 'Querétaro, México',
  },
  {
    id: 3,
    nombre: 'Rosa Hernández',
    especialidad: 'Alebrijes',
    imagen: 'https://picsum.photos/id/1013/200',
    ubicacion: 'Oaxaca, México',
  },
];

const productosSemilla: Omit<Producto, 'id'>[] = [
  {
    nombre: 'Jarrón Talavera Azul',
    descripcion: 'Jarrón hecho a mano con técnica tradicional de Talavera.',
    imagen: 'https://picsum.photos/id/200/300',
    precioInicial: 500,
    precioActual: 650,
    artesanoId: 1,
    fechaFin: '2026-07-01',
  },
  {
    nombre: 'Mantel Bordado Otomí',
    descripcion: 'Mantel con bordado a mano con motivos de la cultura Otomí.',
    imagen: 'https://picsum.photos/id/201/300',
    precioInicial: 800,
    precioActual: 950,
    artesanoId: 2,
    fechaFin: '2026-07-05',
  },
  {
    nombre: 'Alebrije Dragón',
    descripcion: 'Figura de madera pintada a mano representando un dragón.',
    imagen: 'https://picsum.photos/id/202/300',
    precioInicial: 1200,
    precioActual: 1200,
    artesanoId: 3,
    fechaFin: '2026-07-08',
  },
];

let dbPromise: Promise<SQLite.WebSQLDatabase> | null = null;

export function getDatabase(): Promise<SQLite.WebSQLDatabase> {
  if (!dbPromise) {
    dbPromise = inicializar();
  }
  return dbPromise;
}

async function inicializar(): Promise<SQLite.WebSQLDatabase> {
  const db = SQLite.openDatabase(DB_NAME);
  await crearTablas(db);
  await sembrarDatos(db);
  return db;
}

function ejecutarSqlAsync(
  db: SQLite.WebSQLDatabase,
  sql: string,
  params: any[] = []
): Promise<SQLite.SQLResultSet> {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          sql,
          params,
          (_, result) => resolve(result),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      reject
    );
  });
}

export async function execAsync(db: SQLite.WebSQLDatabase, queries: string): Promise<void> {
  const statements = queries
    .split(/;\s*/)
    .map(statement => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await ejecutarSqlAsync(db, statement);
  }
}

export async function getAllAsync<T>(db: SQLite.WebSQLDatabase, sql: string, params: any[] = []): Promise<T[]> {
  const result = await ejecutarSqlAsync(db, sql, params);
  const rows: T[] = [];
  for (let i = 0; i < result.rows.length; i += 1) {
    rows.push(result.rows.item(i));
  }
  return rows;
}

export async function getFirstAsync<T>(db: SQLite.WebSQLDatabase, sql: string, params: any[] = []): Promise<T | null> {
  const rows = await getAllAsync<T>(db, sql, params);
  return rows[0] ?? null;
}

export async function runAsync(db: SQLite.WebSQLDatabase, sql: string, params: any[] = []): Promise<SQLite.SQLResultSet> {
  return ejecutarSqlAsync(db, sql, params);
}

async function crearTablas(db: SQLite.WebSQLDatabase): Promise<void> {
  await execAsync(db, `
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS artesanos (
      id           INTEGER PRIMARY KEY NOT NULL,
      nombre       TEXT    NOT NULL,
      especialidad TEXT,
      imagen       TEXT,
      ubicacion    TEXT
    );

    CREATE TABLE IF NOT EXISTS productos (
      id            INTEGER PRIMARY KEY NOT NULL,
      nombre        TEXT    NOT NULL,
      descripcion   TEXT,
      imagen        TEXT,
      precioInicial REAL,
      precioActual  REAL,
      artesanoId    INTEGER REFERENCES artesanos(id),
      fechaFin      TEXT
    );

    CREATE TABLE IF NOT EXISTS ofertas (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      productoId INTEGER REFERENCES productos(id),
      usuarioId  INTEGER,
      monto      REAL,
      fecha      TEXT
    );
  `);
}

async function sembrarDatos(db: SQLite.WebSQLDatabase): Promise<void> {
  const fila = await getFirstAsync<{ total: number }>(
    db,
    'SELECT COUNT(*) AS total FROM artesanos'
  );

  if ((fila?.total ?? 0) > 0) return;

  for (const artesano of artesanosSemilla) {
    await runAsync(
      db,
      'INSERT INTO artesanos (id, nombre, especialidad, imagen, ubicacion) VALUES (?, ?, ?, ?, ?)',
      [
        artesano.id,
        artesano.nombre,
        artesano.especialidad,
        artesano.imagen,
        artesano.ubicacion,
      ]
    );
  }

  for (const producto of productosSemilla) {
    await runAsync(
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
  }
}

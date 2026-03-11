console.log("¡Probando el micrófono!");
import sqlite3 from 'better-sqlite3';
import fs from 'fs';

// 1. Creamos el archivo físico de la bodega
const db = sqlite3('mientras.db');

// 2. Definimos la estructura (La "hoja de contactos" de tus ensayos)
db.exec(`
  CREATE TABLE IF NOT EXISTS ensayos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    excerpt TEXT,
    date TEXT,
    image TEXT
  )
`);

// 3. Migramos tus datos actuales del JSON a la DB
const metadata = JSON.parse(fs.readFileSync('./metadata.json', 'utf8'));
const insert = db.prepare('INSERT INTO ensayos (title, excerpt, date, image) VALUES (?, ?, ?, ?)');

// Usamos una transacción para que sea rápido y seguro (como un render por lotes)
const insertMany = db.transaction((data) => {
  for (const item of data) {
    insert.run(item.title, item.excerpt, item.date, item.image);
  }
});

insertMany(metadata);
console.log("¡Bodega organizada! Se han migrado los ensayos a mientras.db");
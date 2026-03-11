import express from 'express';
import sqlite3 from 'better-sqlite3';
import cors from 'cors'; // 1. Importamos el guardia VIP

const app = express();

app.use(cors()); // 2. Le decimos a Express que deje pasar a todos (por ahora)

const db = sqlite3('mientras.db');
const PORT = 3001;

app.get('/api/ensayos', (req, res) => {
  console.log("🎬 Alguien pidió la lista de ensayos...");
  const rows = db.prepare('SELECT * FROM ensayos ORDER BY id DESC').all();
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`🚀 Distribuidor encendido en http://localhost:${PORT}`);
});
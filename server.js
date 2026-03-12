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

// Ruta dinámica para entregar UN SOLO ensayo
// El ":id" es como decir "aquí va a venir un número variable"
app.get('/api/ensayos/:id', (req, res) => {
  const idDelEnsayo = req.params.id; // Leemos el boleto (ID) que viene en la URL
  console.log(`🎬 Buscando el ensayo con ID: ${idDelEnsayo}`);
  
  // Usamos .get() en lugar de .all() porque solo queremos un resultado
  const ensayo = db.prepare('SELECT * FROM ensayos WHERE id = ?').get(idDelEnsayo);
  
  if (ensayo) {
    res.json(ensayo); // Si lo encuentra, lo envía
  } else {
    res.status(404).json({ error: "Ensayo no encontrado" }); // Si no, manda error
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Distribuidor encendido en http://localhost:${PORT}`);
});
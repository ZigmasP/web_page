require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors =  require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { waitForDebugger } = require('inspector');
const { queue } = require('sharp');

const app = express();
const port = process.env.PORT || 3000;

//Sukuriamas uploads katalogas, jei jo nėra
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(uploadsPath));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// Duomenų bazės prisijungimai
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  datebase: process.env.DB_NAME,
  charset: 'utf8mb4',
  waitForConnections: true,
  conectionLIimit: 10,
  queueLimit: 0
});

// Multer konfiguracija
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, res, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalame);
    cb(null, `photo-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage: storage });

// Centralizuotas klaidų tvarkymas
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Kažkas negerai!' });
});

// Registracijos maršrutas
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)';
    const [results] = await pool.query(query, [username, hashedPassword, true]); //true - admin
    res.status(201).json({ message: 'Vartotojas sukūrtas sėkmingai' });   
  } catch {
    res.status(500).json({ error: 'Registracijos klaida '});
  }
});

//Prisijungimo maršrutas
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    const [results] = await pool.query(query, [username]);
    if (results.length === 0) {
      return res.status(401).json({ error: 'Neteisingas prisijungimo vardas ar slaptažodis' });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Neteisingas prisijungimo vardas ar slaptažodis' });
    }
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Prisijungimo klaida' });
  }
});

app.listen(port, () => {
  console.log(`Serveris veikia ant ${port}`);
});
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



app.listen(port, () => {
  console.log(`Serveris veikia ant ${port}`);
});
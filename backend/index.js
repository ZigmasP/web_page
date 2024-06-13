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

const app = express();
const port = process.env.PORT || 3000;

//Sukuriamas uploads katalogas, jei jo nėra
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/conn');
const path = require('path');
const userRoutes = require('./router/userRoutes');
const appointment = require ("./router/appointmentRoutes")
// Connexion avec la base de données

connectDB();

// Création de l'application Express
const app = express();
app.use('/uploads', express.static('./uploads'));

// Middleware CORS
const corsOptions = {
  origin: ['https://frontphonz.vercel.app','http://localhost:3000', 'http://localhost:19006', 'http://localhost:3001'],
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization',
};
app.use(cors(corsOptions));

// Utilisation de cookie-parser 
app.use(cookieParser());
// Utiliser body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes pour l'authentification des utilisateurs
app.use('/api', userRoutes);
app.use('/api',appointment);


// Démarrer le serveur
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

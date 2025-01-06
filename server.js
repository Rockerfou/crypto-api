const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

// Middleware de log pour déboguer
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// CORS configuration maximale
app.use(cors());

// Headers de sécurité
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route simplifiée pour le test
app.get('/ping', (req, res) => {
  console.log('Ping route accessed');
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// Démarrage du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
  console.log(`Test URL: http://localhost:${port}/ping`);
});
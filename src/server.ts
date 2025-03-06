//src/server.ts

import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { routes } from './routes';

const app = express();

// Configuration Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Configuration CORS pour autoriser toutes les origines
app.use(
  cors({
    origin: '*', // Permet à toutes les origines d'accéder à l'API
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
    credentials: true, // Permet d'envoyer des cookies si besoin
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

//--------------------------------------------------------------
//TODO Gestion des erreurs et validation des données avec express-validator
//TODO Sécu
//TODO Tests avec Jest
//--------------------------------------------------------------

// Active SSL only in server
const MODE = process.env.MODE;
if (MODE == 'SERVER') {
  const options = {
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/dev.ludimuseo.fr/fullchain.pem'
    ),
    key: fs.readFileSync('/etc/letsencrypt/live/dev.ludimuseo.fr/privkey.pem'),
  };

  https.createServer(options, app).listen(4000, () => {
    console.log('HTTPS server listening on port 443');
  });
} else {
  app.listen(4000, () => {
    console.log('Le serveur est lancé sur le port 4000');
  });
}

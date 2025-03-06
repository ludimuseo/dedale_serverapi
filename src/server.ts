//src/server.ts

import https from 'https';
import fs from 'fs';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import clientsRouter from './routes/clients.routes';
import placesRouter from './routes/places.routes';
import logsRouter from './routes/logs.routes';
import gamesRouter from './routes/games.routes';
import journeysRouter from './routes/journeys.routes';
import stepsRouter from './routes/steps.routes';
import piecesRouter from './routes/pieces.routes';
import medalsRouter from './routes/medals.routes';
import usersRouter from './routes/users.routes';
import authRouter from './routes/auth.routes';
import { errorHandler } from './middlewares/errorHandler';

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

// Routes
app.use('/api/clients', clientsRouter);
app.use('/logs', logsRouter);
app.use('/api/places', placesRouter);
app.use('/games', gamesRouter);
app.use('/journeys', journeysRouter);
app.use('/steps', stepsRouter);
app.use('/pieces', piecesRouter);
app.use('/medals', medalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);

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
  app.listen(4000, async () => {
    console.log('Le serveur est lancé sur le port 4000');
  });
}

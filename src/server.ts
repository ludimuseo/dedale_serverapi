//src/server.ts

import express from 'express';
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

import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

const app = express();
app.use(express.json());

// Routes
app.use('/api/clients', clientsRouter);
app.use('/logs', logsRouter);
app.use('/places', placesRouter);
app.use('/games', gamesRouter);
app.use('/journeys', journeysRouter);
app.use('/steps', stepsRouter);
app.use('/pieces', piecesRouter);
app.use('/medals', medalsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

//--------------------------------------------------------------
//TODO Gestion des erreurs et validation des données avec express-validator
//TODO Sécu
//TODO Tests avec Jest
//--------------------------------------------------------------

app.listen(4000, async () => {
  console.log('Le serveur est lancé sur le port 4000');
});

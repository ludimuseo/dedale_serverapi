//src/server.ts

import http from 'node:http';
import https, { type ServerOptions } from 'node:https';
import fs from 'node:fs';
import express from 'express';
import { routes } from './routes';
import { security } from './config/security';

const app = express();

// Security
app.use(security);

// Routes
app.use('/', routes);

//--------------------------------------------------------------
//TODO Gestion des erreurs et validation des données avec express-validator
//TODO Sécu
//TODO Tests avec Jest
//--------------------------------------------------------------

// Active SSL only in server
const MODE = process.env.MODE;
const serverOptions: Partial<ServerOptions> = {};

if (MODE == 'SERVER') {
  // 🚨 For security reasons. Please move the file paths to '.env.production'
  // Then remove lines 31 & 32
  const fullChain = '/etc/letsencrypt/live/dev.ludimuseo.fr/fullchain.pem';
  const privKey = '/etc/letsencrypt/live/dev.ludimuseo.fr/privkey.pem';
  Object.assign(serverOptions, {
    cert: fs.readFileSync(process.env.SSL_FULLCHAIN ?? fullChain),
    key: fs.readFileSync(process.env.SSL_PRIVKEY ?? privKey),
  });
  https.createServer(serverOptions, app).listen(4000, () => {
    console.log('Le serveur est lancé sur le port 4000');
  });
} else {
  http.createServer(serverOptions, app).listen(4000, () => {
    console.log('Le serveur est lancé sur le port 4000');
  });
}

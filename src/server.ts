//src/server.ts

import http from 'node:http';
import https, { type ServerOptions } from 'node:https';
import fs from 'node:fs';
import express from 'express';
import { routes } from './routes';
import { security } from './config/security';

// Environment Data
const mode = String(process.env.MODE ?? 'UNDEFINED');
const port: number = parseInt(process.env.PORT ?? '4000');
let server;

// Express
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
if (mode == 'SERVER') {
  // 🚨 For security reasons. Please move the file paths to '.env.production'
  // Then remove lines 34 & 35
  const fullChain = '/etc/letsencrypt/live/dev.ludimuseo.fr/fullchain.pem';
  const privKey = '/etc/letsencrypt/live/dev.ludimuseo.fr/privkey.pem';
  const serverOptions: ServerOptions = {
    cert: fs.readFileSync(process.env.SSL_FULLCHAIN ?? fullChain),
    key: fs.readFileSync(process.env.SSL_PRIVKEY ?? privKey),
  };
  server = https.createServer(serverOptions, app);
} else {
  server = http.createServer(app);
}

server.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port.toString()}`);
});

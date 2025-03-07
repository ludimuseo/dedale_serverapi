//src/server.ts

import http from 'node:http';
import https from 'node:https';
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
  http.createServer({}, app).listen(4000, () => {
    console.log('Le serveur est lancé sur le port 4000');
  });
}

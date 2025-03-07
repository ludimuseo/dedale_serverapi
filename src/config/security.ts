import { Router, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const security = Router();

security.use(json());
security.use(urlencoded({ extended: true }));
// Configuration Helmet
security.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
// Configuration CORS pour autoriser toutes les origines
security.use(
  cors({
    origin: '*', // Permet à toutes les origines d'accéder à l'API
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
    credentials: true, // Permet d'envoyer des cookies si besoin
  })
);

export { security };

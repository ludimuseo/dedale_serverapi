import { Router, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const security = Router();

security.use(json());
security.use(urlencoded({ extended: true }));

// Configuration Helmet
security.use(
  // https://www.npmjs.com/package/helmet
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Configuration CORS
security.use(
  // https://www.npmjs.com/package/cors
  cors({
    origin: '*', // Permet à toutes les origines d'accéder à l'API
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
    credentials: true, // Permet d'envoyer des cookies si besoin
  })
);

export { security };

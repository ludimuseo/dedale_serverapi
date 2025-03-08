import express, { Router, json, urlencoded } from 'express';
import cors, { type CorsOptions } from 'cors';
import helmet, { type HelmetOptions } from 'helmet';
import session, { type SessionOptions } from 'express-session';

const app = express();
const security = Router();

// Configuration Helmet
const helmetOptions: HelmetOptions = {
  crossOriginResourcePolicy: { policy: 'cross-origin' },
};

// Configuration CORS
const corsOptions: CorsOptions = {
  origin: '*', // Permet à toutes les origines d'accéder à l'API
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
  credentials: true, // Permet d'envoyer des cookies si besoin
};

// Configuration Sessions
const sessionOptions: SessionOptions = {
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: app.get('env') === 'production' },
};

// Configuration Body-Parser
const bodyParser = [json(), urlencoded({ extended: true })];

// https://www.npmjs.com/package/helmet
security.use(helmet(helmetOptions));
// https://www.npmjs.com/package/cors
security.use(cors(corsOptions));
// https://www.npmjs.com/package/express-session
security.use(session(sessionOptions));
// https://www.npmjs.com/package/body-parser
security.use(bodyParser);

export { security };

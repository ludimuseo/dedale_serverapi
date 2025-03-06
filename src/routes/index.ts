import { Router } from 'express';
import clientsRouter from './clients.routes';
import placesRouter from './places.routes';
import logsRouter from './logs.routes';
import gamesRouter from './games.routes';
import journeysRouter from './journeys.routes';
import stepsRouter from './steps.routes';
import piecesRouter from './pieces.routes';
import medalsRouter from './medals.routes';
import usersRouter from './users.routes';
import authRouter from './auth.routes';
import { errorHandler } from '../middlewares/errorHandler';

const routes = Router();

routes.use('/api/clients', clientsRouter);
routes.use('/logs', logsRouter);
routes.use('/api/places', placesRouter);
routes.use('/games', gamesRouter);
routes.use('/journeys', journeysRouter);
routes.use('/steps', stepsRouter);
routes.use('/pieces', piecesRouter);
routes.use('/medals', medalsRouter);
routes.use('/api/users', usersRouter);
routes.use('/api/auth', authRouter);
routes.use(errorHandler);

export { routes };

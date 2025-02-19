// games.routes.ts

import { Router } from 'express';
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from '../controllers/games.controller';
import { validateId } from '../middlewares/validation';

const router = Router();

router.get('/list', getAllGames);
router.get('/find/:id', validateId, getGameById);
router.post('/create', createGame); // Ajouter des validations si nécessaire
router.patch('/update/:id', validateId, updateGame); // Ajouter des validations si nécessaire
router.delete('/delete/:id', validateId, deleteGame);

export default router;

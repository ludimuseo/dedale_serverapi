//places.routes.ts

import { Router } from 'express';
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from '../controllers/places.controller';
import { validateId, validateLieuCreation } from '../middlewares/validation';
import auth from '../middlewares/auth';

const router = Router();

router.get('/list', getAllPlaces);
router.post('/', auth, ...validateLieuCreation, createPlace);
router.get('/find/:id', validateId, getPlaceById);
router.post('/create', createPlace); // Ajouter des validations supplémentaires si nécessaire
router.patch('/update/:id', validateId, updatePlace); // Ajouter des validations supplémentaires si nécessaire
router.delete('/delete/:id', validateId, deletePlace);

export default router;

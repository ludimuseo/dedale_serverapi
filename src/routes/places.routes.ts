//places.routes.ts

import { Router } from 'express';
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  activePlace,
  updatePlace,
  deletePlace,
} from '../controllers/places.controller';
import { validateId, validateLieuCreation } from '../middlewares/validation';
import auth from '../middlewares/auth';
import noMobile from '../middlewares/noMobile';

const router = Router();

router.get('/list', getAllPlaces);
router.post('/', auth, noMobile, ...validateLieuCreation, createPlace);
router.get('/find/:id', validateId, getPlaceById);
router.post('/create', auth, noMobile, createPlace); // Ajouter des validations supplémentaires si nécessaire
router.put('/active', auth, noMobile, activePlace);
router.patch('/update/:id', auth, noMobile, validateId, updatePlace); // Ajouter des validations supplémentaires si nécessaire
router.delete('/delete/:id', auth, noMobile, validateId, deletePlace);

export default router;

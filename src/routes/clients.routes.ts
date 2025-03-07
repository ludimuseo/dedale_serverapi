//clients.routes.ts

import { Router } from 'express';
import {
  validateClientCreation,
  validateClientUpdate,
  validateId,
} from '../middlewares/validation';
import authMiddleware from '../middlewares/auth';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clients.controller';
import noMobile from '../middlewares/noMobile';

const router = Router();

router.get('/list', getAllClients);
router.get('/find/:id', validateId, getClientById);
router.post(
  '/create',
  authMiddleware,
  noMobile,
  validateClientCreation,
  createClient
);
router.patch(
  '/update/:id',
  noMobile,
  validateId,
  validateClientUpdate,
  updateClient
);
router.delete('/delete/:id', noMobile, validateId, deleteClient);

export default router;

//users.routes.ts

import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
import {
  validateUserCreation,
  validateUserUpdate,
  validateId,
} from '../middlewares/validation';

const router = Router();

router.get('/list', getAllUsers);
router.get('/find/:id', validateId, getUserById);
router.post('/create', validateUserCreation, createUser);
router.patch('/update/:id', validateId, validateUserUpdate, updateUser);
router.delete('/delete/:id', validateId, deleteUser);

export default router;

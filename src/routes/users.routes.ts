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
import auth from '../middlewares/auth';
import noMobile from '../middlewares/noMobile';

const router = Router();

router.get('/list', auth, noMobile, getAllUsers);
router.get('/find/:id', auth, noMobile, validateId, getUserById);
router.post('/create', validateUserCreation, createUser);
router.patch('/update/:id', validateId, validateUserUpdate, updateUser);
router.delete('/delete/:id', auth, noMobile, validateId, deleteUser);

export default router;

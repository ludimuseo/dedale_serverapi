import { Router } from 'express';
import { login } from '../controllers/users.controller';
import { validateUserLogin } from '../middlewares/validation';

const router = Router();

router.post('/login', validateUserLogin, login);

export default router;

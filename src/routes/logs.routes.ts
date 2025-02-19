import { Router } from 'express';
import { logs } from '../controllers/logs.controller';
import auth from '../middlewares/auth';


const router = Router();

router.post('/', auth, logs);

export default router;

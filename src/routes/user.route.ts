import { Router } from 'express';
import AuthMiddleware from '@/middlewares/auth.middleware';
import { UserController } from '@/controllers/user.controller';
const router = Router();

const { registerUser } = new UserController();
//Without middleware
router.post('/register', registerUser);

export default router;

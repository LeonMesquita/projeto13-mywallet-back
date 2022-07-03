
import { createUser, loginUser, logoutUser } from '../controllers/userController.js';
import { Router} from 'express';

const router = Router();
router.post('/sign-in', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
export default router;
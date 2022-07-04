
import { Router} from 'express';
import {addRegister, getRegisters, deleteRegister} from '../controllers/registerController.js'
import { validateUser } from '../middlewares/validateUser.js';

const router = Router();
router.post('/add-register',validateUser, addRegister);
router.get('/get-registers',validateUser, getRegisters);
router.post('/delete-register',validateUser, deleteRegister);
export default router;
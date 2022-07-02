import { Router} from 'express';
import {addRegister, getRegisters} from '../controllers/registerController.js'

const router = Router();
router.post('/add-register', addRegister);
router.get('/get-registers', getRegisters);

export default router;
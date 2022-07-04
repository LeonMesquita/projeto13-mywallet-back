
import { Router} from 'express';
import {addRegister, getRegisters, deleteRegister} from '../controllers/registerController.js'

const router = Router();
router.post('/add-register', addRegister);
router.get('/get-registers', getRegisters);
router.post('/delete-register', deleteRegister);
export default router;
import express from 'express';
import {getUserById, loginUser, registerUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get', getUserById)
export default router;

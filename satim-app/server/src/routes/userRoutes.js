import express from 'express';
import { fetchUsers } from '../controllers/userController.js';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', fetchUsers);

router.post('/register', registerUser);


export default router;

import express from 'express';
import {loginUser, registerUser} from '../controllers/userController.js';
import {createProject} from "../controllers/projectController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/projects', createProject);

export default router;

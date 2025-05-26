import express from 'express';
import {createProject, getAllProjects} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects)

export default router;

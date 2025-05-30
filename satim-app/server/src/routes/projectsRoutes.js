import express from 'express';
import {createProject, getAllProjects, getProject, updateProject} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects)
router.get('/get', getProject)
router.put('/update', updateProject);

export default router;

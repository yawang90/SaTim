import express from 'express';
import {createProject, getAllProjects, getProject} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects)
router.get('/get', getProject)

export default router;

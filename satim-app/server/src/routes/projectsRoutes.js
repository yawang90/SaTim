import express from 'express';
import {
    createProject,
    getAllProjects,
    getProject,
    removeProject,
    updateProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects)
router.get('/get', getProject)
router.put('/update', updateProject);
router.delete('/delete', removeProject);

export default router;

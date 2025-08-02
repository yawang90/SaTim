import express from 'express';
import {
    addProjectMembers,
    createProject,
    getAllProjects,
    getProject, getProjectMembers,
    removeProject, sendInviteEmail,
    updateProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects)
router.get('/get', getProject)
router.get('/members', getProjectMembers);
router.put('/update', updateProject);
router.delete('/delete', removeProject);
router.post('/addMembers', addProjectMembers);
router.get('/invite', sendInviteEmail);

export default router;

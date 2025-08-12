import express from 'express';
import {
    addProjectMember,
    createProject,
    getAllProjects,
    getProject, getProjectMembers,
    removeProject, removeProjectMember, sendInviteEmail,
    updateProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create', createProject);
router.get('/getAll', getAllProjects)
router.get('/get', getProject)
router.get('/members', getProjectMembers);
router.put('/update', updateProject);
router.delete('/delete', removeProject);
router.post('/addMember', addProjectMember);
router.post('/removeMember', removeProjectMember);
router.get('/invite', sendInviteEmail);

export default router;

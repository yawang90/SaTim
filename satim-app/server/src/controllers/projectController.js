import {
    saveNewProject,
    findAllProjects,
    findProject,
    editProject,
    deleteProject,
    findAllMembersForProject
} from '../services/projectService.js';
import {projectValidationSchema} from '../validation/projectValidation.js';
import {stringifyBigInts} from "./helper.js";

export const createProject = async (req, res) => {
    const {error} = projectValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    try {
        const project = await saveNewProject(req.body);
        res.status(201).json({
            id: project.id.toString(),
            name: project.name
        });
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({message: 'Database error'});
    }
};

export const getAllProjects = async (req, res) => {
    const {userId} = req.query;
    if (!userId) {
        return res.status(400).json({message: 'Missing userId'});
    }
    const projects = await findAllProjects({ userId });
    res.json(stringifyBigInts(projects))
}

export const getProject = async (req, res) => {
    const {projectId} = req.query;
    if (!projectId) {
        return res.status(400).json({message: 'Missing projectId'});
    }
    const projects = await findProject({ projectId });
    res.json(stringifyBigInts(projects))
}

export const updateProject = async (req, res) => {
    const { projectId, name, description, userId } = req.body;

    if (!projectId) {
        return res.status(400).json({ message: 'Missing projectId' });
    }

    try {
        const updatedProject = await editProject({projectId, name, description, userId})
        res.status(200).json(stringifyBigInts(updatedProject));
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ message: 'Could not update project' });
    }
};

export const removeProject = async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        return res.status(400).json({ message: 'Missing projectId' });
    }

    try {
        await deleteProject({ projectId });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ message: 'Could not delete project' });
    }
};

export const getProjectMembers = async (req, res) => {
    const { projectId } = req.query;

    if (!projectId) {
        return res.status(400).json({ message: 'Missing projectId' });
    }

    try {
        const members = await findAllMembersForProject({ projectId });
        const formatted = members.map(member => ({
            id: member.users.id,
            firstName: member.users.first_name,
            lastName: member.users.last_name,
            email: member.users.email,
            role: member.role,
        }));

        res.status(200).json(formatted);
    } catch (error) {
        console.error('Error fetching project members:', error);
        res.status(500).json({ message: 'Could not fetch project members' });
    }
};

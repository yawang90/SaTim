import {saveNewProject, findAllProjects, findProject} from '../services/projectService.js';
import {projectValidationSchema} from '../validation/projectValidation.js';

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
    res.json(projects)
}

export const getProject = async (req, res) => {
    const {projectId} = req.query;
    if (!projectId) {
        return res.status(400).json({message: 'Missing projectId'});
    }
    const projects = await findProject({ projectId });
    res.json(projects)
}
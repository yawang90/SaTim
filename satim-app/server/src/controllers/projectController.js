import { saveNewProject } from '../services/projectService.js';
import { projectValidationSchema } from '../validation/projectValidation.js';

export const createProject = async (req, res) => {
    const { error } = projectValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const project = await saveNewProject(req.body);
        res.status(201).json({
            id: project.id.toString(),
            name: project.name
        });
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ message: 'Database error' });
    }
};

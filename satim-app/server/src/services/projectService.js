import prisma from '../config/prismaClient.js';

export const saveNewProject = async (name, description, userId) => {
    const ownerId = Number(userId);

    return prisma.projects.create({
        data: {
            name,
            description,
            owner_id: ownerId,
            project_access: {
                create: {
                    user_id: ownerId,
                    role: 'admin'
                }
            }
        },
    });
};

export const findAllProjects = async (userId) => {
    return prisma.project_access.findMany({
        where: {
            user_id: userId
        },
        include: {
            projects: true
        }
    });
}

export const findProject = async (projectId) => {
    return prisma.project_access.findFirst({
        where: {
            project_id: projectId
        },
        include: {
            projects: true
        }
    });
}

export const editProject = async (projectId, name, description, owner_id) => {
    return prisma.projects.update({
        where: {
            id: Number(projectId),
        },
        data: {
            ...(name && {name: name}),
            ...(description && {description: description}),
            ...(owner_id && {owner_id: Number(owner_id)}),
            updated_at: new Date(),
        }
    });
}
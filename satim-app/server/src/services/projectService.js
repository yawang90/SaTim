import prisma from '../config/prismaClient.js';

export const saveNewProject = async ({ name, description, userId }) => {
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

export const findAllProjects = async ({userId}) => {
    const ownerId = Number(userId);

    return prisma.project_access.findMany({
        where: {
            user_id: ownerId
        },
        include: {
            projects: true
        }
    });
}
import prisma from '../config/prismaClient.js';

export const saveNewProject = async ({ name, description, userId }) => {
    return await prisma.project.create({
        data: {
            name,
            description,
            user: { connect: { id: userId } },
        },
    });
};

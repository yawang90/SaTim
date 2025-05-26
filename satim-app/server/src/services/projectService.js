import prisma from '../config/prismaClient.js';

export const saveNewProject = async ({ name, description, userId }) => {
    return prisma.projects.create({
        data: {
            name,
            description,
            users: { connect: { id: BigInt(userId) } },
        },
    });
};

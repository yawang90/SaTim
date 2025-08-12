import prisma from '../config/prismaClient.js';
import {project_access_role} from "@prisma/client";

export const saveNewProject = async ({name, description, userId}) => {
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

export const findProject = async ({projectId}) => {
    const project = Number(projectId);

    return prisma.project_access.findFirstOrThrow({
        where: {
            project_id: project
        },
        include: {
            projects: true
        }
    });
}

export const editProject = async ({projectId, name, description, userId}) => {
    return prisma.projects.update({
        where: {
            id: Number(projectId),
        },
        data: {
            ...(name && {name: name}),
            ...(description && {description: description}),
            ...(userId && {owner_id: Number(userId)}),
            updated_at: new Date(),
        }
    });
}

export const deleteProject = async ({ projectId }) => {
    return prisma.projects.delete({
        where: {
            id: Number(projectId),
        },
    });
};

export const findAllMembersForProject = async ({ projectId }) => {
    return prisma.project_access.findMany({
        where: {
            project_id: Number(projectId),
        },
        include: {
            users: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                },
            },
        },
    });
};

export const addUserToProject = async ({projectId, userId}) => {
    const existingAccess = await prisma.project_access.findUnique({
        where: {
            project_id_user_id: {
                project_id: Number(projectId),
                user_id: userId
            }
        }
    });

    if (existingAccess) {
        return existingAccess;
    }

    return prisma.project_access.create({
        data: {
            project_id: Number(projectId),
            user_id: userId,
            role: project_access_role.editor
        },
        include: {
            users: true
        }
    });
}

export const removeUserFromProject = async ({ projectId, userId }) => {
    const existingAccess = await prisma.project_access.findUnique({
        where: {
            project_id_user_id: {
                project_id: Number(projectId),
                user_id: userId
            }
        }
    });

    if (!existingAccess) {
        return null;
    }

    return prisma.project_access.delete({
        where: {
            project_id_user_id: {
                project_id: Number(projectId),
                user_id: userId
            }
        },
        include: {
            users: true
        }
    });
};

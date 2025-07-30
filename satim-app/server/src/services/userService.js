import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const saveNewUser = async ({ first_name, last_name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return prisma.users.create({
        data: {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            roles: ['GENERAL'],
        }, select: {
            id: true
        }
    });
};

export const loginUserService = async (email) => {
    return prisma.users.findUnique({where: {email}});
};

export const findUser = async (userId) => {
    const user = Number(userId);
    return prisma.users.findUnique({where: {id: user}});
}

export const findUsersByNameOrEmail = async (query, projectId) => {
    return prisma.users.findMany({
        where: {
            OR: [
                { last_name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } }
            ],
            project_access: {
                none: {
                    project_id: Number(projectId)
                }
            }
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
        },
        take: 10
    });
}
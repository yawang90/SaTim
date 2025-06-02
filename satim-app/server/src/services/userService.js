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

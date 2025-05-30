import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const saveNewUser = async ({ vorname, nachname, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return prisma.users.create({
        data: {
            vorname,
            nachname,
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

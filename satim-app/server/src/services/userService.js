import db from '../config/db.js';
import bcrypt from "bcrypt";

const saltRounds = 10;

export const saveNewUser = async (request) => {
    const {vorname, nachname, email, password} = request
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
        INSERT INTO users (nachname, email, password, roles, vorname)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `;
    const values = [
        nachname,
        email,
        hashedPassword,
        '{GENERAL}',
        vorname
    ];
    return await db.query(query, values);
};

export const loginUserService = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
};


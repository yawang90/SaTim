import db from '../config/db.js';

export const saveNewUser = async (request) => {
    const {vorname, nachname, email, password} = request
    const query = `
        INSERT INTO users (nachname, email, password, roles, vorname)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `;
    const values = [
        nachname,
        email,
        password,
        '{GENERAL}',
        vorname
    ];
    return await db.query(query, values);
};



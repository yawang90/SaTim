import db from '../config/db.js';

export const getUsers = async () => {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
};



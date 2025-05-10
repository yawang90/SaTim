import { getUsers } from '../services/userService.js';
import db from '../db/index.js';

export const fetchUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const registerUser = async (req, res) => {
    const { vorname, nachname, email, passwort } = req.body;

    try {
        const query = `
      INSERT INTO users (nachname, email, password, ARRAY['GENERAL'], vorname)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
        const values = [vorname, nachname, email, passwort];

        const result = await db.query(query, values);

        res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Database error' });
    }
};

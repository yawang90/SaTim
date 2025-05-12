import {saveNewUser} from '../services/userService.js';
import {registerValidationSchema} from "../validation/userValidation.js";

export const registerUser = async (req, res) => {
    const {error} = registerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    try {
        const result = await saveNewUser(req.body);
        res.status(201).json({message: 'User registered successfully', userId: result.rows[0].id});
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({message: 'Database error'});
    }
};

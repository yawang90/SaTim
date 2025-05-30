import {saveNewUser, loginUserService} from '../services/userService.js';
import {registerValidationSchema} from "../validation/userValidation.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const {error} = registerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }
    try {
        const result = await saveNewUser(req.body);
        res.status(201).json({ message: 'User registered successfully', userId: result.id.toString()});
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({message: 'Database error'});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await loginUserService(email);
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign(
            { userId: user.id.toString(), email: user.email },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({token, userId: user.id});
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({message: 'Server error'});
    }
};

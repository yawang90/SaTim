import Joi from 'joi';

export const userValidationSchema = Joi.object({
    vorname: Joi.string().min(2).max(50).required(),
    nachname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.string().min(6).max(20).required()
});

export const registerValidationSchema = userValidationSchema.keys({
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords must match',
    }),
});
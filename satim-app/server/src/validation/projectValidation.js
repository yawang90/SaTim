import Joi from 'joi';

export const projectValidationSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required(),
    userId: Joi.number().integer().positive().required(),
});

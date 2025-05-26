import Joi from 'joi';

export const projectValidationSchema = Joi.object({
    name: Joi.string().max(40).required(),
    description: Joi.string().max(255).allow('', null),
    userId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

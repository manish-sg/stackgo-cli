import Joi from '@hapi/joi';

const emailValidation = Joi.object({
    email: Joi.string().email().lowercase().required()
});

export default { emailValidation };

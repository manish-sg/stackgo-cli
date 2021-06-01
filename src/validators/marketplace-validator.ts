import Joi from '@hapi/joi';

const emailValidation = Joi.string().email().lowercase().required();

export default { emailValidation };

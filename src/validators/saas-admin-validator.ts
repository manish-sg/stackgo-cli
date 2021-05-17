import Joi from '@hapi/joi';
import { VALID_STATUS_LIST } from '../constants/validation-constants';

const saasAdminValidation = Joi.object({
    name: Joi.string(),
    nickname: Joi.string().lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().lowercase(),
    status: Joi.string().uppercase().valid(VALID_STATUS_LIST[0], VALID_STATUS_LIST[1])
});

const linkSaaSAdminToOrgValidation = Joi.object({
    email: Joi.string().lowercase().required(),
    orgId: Joi.number().required()
});

const emailValidation = Joi.object({
    email: Joi.string().email().lowercase().required()
});

export default { saasAdminValidation, linkSaaSAdminToOrgValidation, emailValidation };

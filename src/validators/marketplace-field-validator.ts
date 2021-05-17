import Joi from '@hapi/joi';

const marketplaceIdValidation = Joi.object({
    marketplaceId: Joi.number().required()
});

export default { marketplaceIdValidation };

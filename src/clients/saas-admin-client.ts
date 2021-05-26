import logging from '../config/logging';
import axios from 'axios';
import saasAdminValidator from '../validators/saas-admin-validator';

const NAMESPACE = 'MARKETPLACE CLIENT';
const config = { headers: { 'Content-Type': 'application/json' } };

const createSaaSAdmin = async (request: any) => {
    try {
        const result = await saasAdminValidator.saasAdminValidation.validateAsync(request);
        const response = await axios.post(`${process.env.API_BASE_URL}/headless/marketplace-field/get-marketplace-field-by-marketplace-id/`, request, config);
        logging.info(NAMESPACE, 'Response: ', response.data);
        return response.data;
    } catch (error) {
        logging.error(NAMESPACE, error);
    }
};

export default { createSaaSAdmin };

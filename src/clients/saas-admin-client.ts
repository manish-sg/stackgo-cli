import { response } from 'express';
import logging from '../config/logging';
import axios from 'axios';

const NAMESPACE = 'MARKETPLACE CLIENT';
const config = { headers: { 'Content-Type': 'application/json' } };

const createSaaSAdmin = async (request: string) => {
    try {
        const result = await axios.get(`${process.env.API_BASE_URL}/headless/marketplace-field/get-marketplace-field-by-marketplace-id/`, config);
        logging.info(NAMESPACE, 'Response: ', result.data);
        return result.data;
    } catch (error) {
        logging.error(NAMESPACE, error);
    }
};

export default { createSaaSAdmin };

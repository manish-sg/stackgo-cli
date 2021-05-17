import logging from '../config/logging';
import axios from 'axios';
import validator from '../validators/marketplace-validator';

const NAMESPACE = 'MARKETPLACE CLIENT';
const config = { headers: { 'Content-Type': 'application/json' } };

const getAllMarketPlaces = async () => {
    try {
        const result = await axios.get(`${process.env.API_BASE_URL}/headless/marketplace/get-all-marketplaces`, config);
        logging.info(NAMESPACE, 'Response: ', result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

const getAvailableIntegrationOptions = async (email: string) => {
    try {
        const result = await validator.emailValidation.validateAsync(email);
        const response = await axios.get(`${process.env.API_BASE_URL}/headless/marketplace/get-available-integration-options/${result.email}`, config);
        logging.info(NAMESPACE, 'Response: ', response.data);
        return response.data;
    } catch (error) {
        logging.error(NAMESPACE, error);
    }
};

export default { getAllMarketPlaces, getAvailableIntegrationOptions };
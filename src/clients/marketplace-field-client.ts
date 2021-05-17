import logging from '../config/logging';
import axios from 'axios';
import validator from '../validators/marketplace-field-validator';

const NAMESPACE = 'MARKETPLACE CLIENT';
const config = { headers: { 'Content-Type': 'application/json' } };

const getMarketPlaceFieldByMarketplaceId = async (marketplaceId: string) => {
    try {
        const result = await validator.marketplaceIdValidation.validateAsync(marketplaceId);
        const response = await axios.get(`${process.env.API_BASE_URL}/headless/marketplace-field/get-marketplace-field-by-marketplace-id/${result.marketplaceId}`, config);
        logging.info(NAMESPACE, 'Response: ', response.data);
        return response.data;
    } catch (error) {
        logging.error(NAMESPACE, error);
    }
};

export default { getMarketPlaceFieldByMarketplaceId };

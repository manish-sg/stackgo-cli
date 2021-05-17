import client from '../clients/marketplace-client';
import logging from '../config/logging';

const NAMESPACE = 'MARKETPLACE CONSUMER';

const test = () => {
    getAllMarketPlaces;
    getAvailableIntegrationOptions('siddharthcse7@gmail.com');
};

const getAllMarketPlaces = async () => {
    const response = await client.getAllMarketPlaces();
    logging.info(NAMESPACE, 'Response:', response);
};

const getAvailableIntegrationOptions = async (email: string) => {
    const response = await client.getAvailableIntegrationOptions(email);
    logging.info(NAMESPACE, 'Response:', response);
};

export default { test, getAllMarketPlaces, getAvailableIntegrationOptions };

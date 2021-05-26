import client from '../clients/marketplace-client';
import tokenClient from '../clients/token-client';
import logging from '../config/logging';

const NAMESPACE = 'MARKETPLACE CONSUMER';

const test = async () => {
    const response = await tokenClient.getToken(process.env.CLIENT_ID || '', process.env.CLIENT_SECRET || '');
    logging.info(NAMESPACE, 'Access Token:', response.access_token);
    const accessToken = response.access_token;
    getAllMarketPlaces(accessToken);
    //getAvailableIntegrationOptions('siddharthcse7@gmail.com', accessToken);
};

const getAllMarketPlaces = async (token: string) => {
    const response = await client.getAllMarketPlaces(token);
    logging.info(NAMESPACE, 'Response:', response);
};

const getAvailableIntegrationOptions = async (email: string, token: string) => {
    const response = await client.getAvailableIntegrationOptions(email, token);
    logging.info(NAMESPACE, 'Response:', response);
};

export default { test, getAllMarketPlaces, getAvailableIntegrationOptions };

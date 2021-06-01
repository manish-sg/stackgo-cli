import client from '../clients/marketplace-client';
import tokenClient from '../clients/token-client';
import { Token } from '../clients/token-client';
import logging from '../config/logging';

const NAMESPACE = 'MARKETPLACE CONSUMER';
const test = async () => {
    await tokenClient.authenticate(process.env.CLIENT_ID || '', process.env.CLIENT_SECRET || '');
    await getAllMarketPlaces();
    await getAllMarketPlaces();
    await getAllMarketPlaces();
    //getAvailableIntegrationOptions('siddharthcse7@gmail.com');
};

const getAllMarketPlaces = async () => {
    const response = await client.getAllMarketPlaces(await tokenClient.verifyAndReturnToken(Token.tokenResponse));
    logging.info(NAMESPACE, 'Response:', response);
};

const getAvailableIntegrationOptions = async (email: string) => {
    const response = await client.getAvailableIntegrationOptions(email, await tokenClient.verifyAndReturnToken(Token.tokenResponse));
    logging.info(NAMESPACE, 'Response:', response);
};

export default { test, getAllMarketPlaces, getAvailableIntegrationOptions };

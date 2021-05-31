import client from '../clients/marketplace-client';
import tokenClient from '../clients/token-client';
import {Token} from '../clients/token-client';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'MARKETPLACE CONSUMER';
var tokenResponse: { access_token: string } | null = null;
const test = async () => {
    const response = await tokenClient.authenticate(process.env.CLIENT_ID || '', process.env.CLIENT_SECRET || '');
    logging.info(NAMESPACE, 'Access Token:', response.access_token);
    getAllMarketPlaces();
    //getAvailableIntegrationOptions('siddharthcse7@gmail.com', accessToken);
};

const getAllMarketPlaces = async () => {
    const response = await client.getAllMarketPlaces(await verifyAndReturnToken(Token.tokenResponse));
    logging.info(NAMESPACE, 'Response:', response);
};

const getAvailableIntegrationOptions = async (email: string, token: string) => {
    const response = await client.getAvailableIntegrationOptions(email, token);
    logging.info(NAMESPACE, 'Response:', response);
};

const verifyAndReturnToken = async (response: any) => {
    logging.debug(NAMESPACE, `successCall = ${Token.successCall} Response = ${response}`);
    if (Token.successCall === true) {
        const decodedToken: any = jwt.decode(response?.access_token);
        if (decodedToken['exp'] !== null && Date.now() / 1000 < decodedToken['exp'] - 100) {
            return response?.access_token;
        } else {
            tokenResponse = await tokenClient.authenticate(process.env.CLIENT_ID || '', process.env.CLIENT_SECRET || '');
        }
    } else {
        throw new Error('Authentication error.');
    }
    return tokenResponse?.access_token;
};

export default { test, getAllMarketPlaces, getAvailableIntegrationOptions };

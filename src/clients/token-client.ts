import logging from '../config/logging';
import axios from 'axios';
import qs from 'qs';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'TOKEN CLIENT';

export class Token {
    public static tokenResponse: { access_token: string } | null = null;
    public static successCall = false;
    public static clientId = '';
    public static clientSecret = '';
}

const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
const authenticate = async (clientId: string, clientSecret: string) => {
    logging.info(NAMESPACE, `Client id ${clientId}, Secret ${clientSecret} `);
    const req = {
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://stackgo.prod.api',
        grant_type: 'client_credentials'
    };

    const result = await axios.post(`https://stackgo.au.auth0.com/oauth/token`, qs.stringify(req), config);
    logging.info(NAMESPACE, 'Token response: ', result.data);
    if (result.data !== null && result.data['access_token'] !== null) {
        Token.successCall = true;
        Token.tokenResponse = result.data;
        Token.clientId = clientId;
        Token.clientSecret = clientSecret;
    }
    //   logging.info(NAMESPACE, 'Access Token:', result.data.access_token);

    return result.data;
};

const verifyAndReturnToken = async (response: any) => {
    logging.debug(NAMESPACE, `successCall = ${Token.successCall} Response = ${response}`);
    if (Token.successCall === true) {
        const decodedToken: any = jwt.decode(response?.access_token);
        logging.debug(NAMESPACE, `Now: ${Date.now() / 1000} Expiry: ${decodedToken['exp'] - 100}`);
        if (decodedToken['exp'] !== null && Date.now() / 1000 < decodedToken['exp'] - 100) {
            return response?.access_token;
        } else {
            return await authenticate(Token.clientId, Token.clientSecret);
        }
    } else {
        throw new Error('Authentication error.');
    }
};

export default { authenticate, verifyAndReturnToken };

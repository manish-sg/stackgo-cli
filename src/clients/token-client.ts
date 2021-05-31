import logging from '../config/logging';
import axios from 'axios';
import qs from 'qs';

const NAMESPACE = 'TOKEN CLIENT';

const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
var tokenResponse: { access_token: string } | null = null;
var successCall = false;
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
        successCall = true;
        tokenResponse = result.data;
    }
    return result.data;
};

export default { authenticate, successCall, tokenResponse };

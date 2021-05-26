import logging from '../config/logging';
var request = require('request');
import axios from 'axios';
import qs from 'qs';

const NAMESPACE = 'TOKEN CLIENT';

const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

const getToken = async (clientId: string, clientSecret: string) => {
    logging.info(NAMESPACE, `Client id ${clientId}, Secret ${clientSecret} `);
    const req = {
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://stackgo.prod.api',
        grant_type: 'client_credentials'
    };

    const result = await axios.post(`https://stackgo.au.auth0.com/oauth/token`, qs.stringify(req), config);
    logging.info(NAMESPACE, 'Token response: ', result.data);
    return result.data;
};
export default { getToken };

import client from '../clients/saas-admin-client';
import logging from '../config/logging';

const NAMESPACE = 'MARKETPLACE CONSUMER';

const test = () => {
    
    const request = {
        name: 'Siddharth',
        nickname: 'Sid',
        email: 'email@email.com',
        phone: '0444777888',
        status: 'ACTIVE'
    };
    createSaaSAdmin(request);
};

const createSaaSAdmin = async (request: any) => {
    const response = await client.createSaaSAdmin(request);
    logging.info(NAMESPACE, 'Response:', response);
};

export default { test, createSaaSAdmin };

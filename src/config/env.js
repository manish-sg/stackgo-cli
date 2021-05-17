const dotenv = require('dotenv');

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
const apiJWTAudience = process.env.API_JWT_AUDIENCE;
const AUTH0_API_AUDIENCE = process.env.AUTH0_API_AUDIENCE;

if (!audience) {
    throw new Error('.env is missing the definition of an AUTH0_AUDIENCE environmental variable');
}

if (!domain) {
    throw new Error('.env is missing the definition of an AUTH0_DOMAIN environmental variable');
}

if (!serverPort) {
    throw new Error('.env is missing the definition of a API_PORT environmental variable');
}

if (!clientOriginUrl) {
    throw new Error('.env is missing the definition of a APP_ORIGIN environmental variable');
}

const clientOrigins = [process.env.CLIENT_ORIGIN_URL];

module.exports = {
    audience,
    domain,
    serverPort,
    clientOriginUrl,
    clientOrigins,
    AUTH0_API_AUDIENCE
};

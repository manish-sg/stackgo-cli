import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './src/config/logging';
import config from './src/config/config';
import routes from './src/routes/routes';

const NAMESPACE = 'Server';
const router = express();


/** Log the request */
router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/** Routes go here */
router.use('/api/health', routes.healthRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

router.use((err: { status: any; message: any }, req: any, res: { status: (arg0: any) => void; send: (arg0: { error: { status: any; message: any } }) => void }, next: any) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => {
    return logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`);
});

import express from 'express';
import controller from '../controllers/health-controller';
import client from '../consumers/marketplace-consumer';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

router.get('/test', client.test);

export = router;

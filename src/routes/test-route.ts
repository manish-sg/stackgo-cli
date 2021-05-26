import express from 'express';
import consumer from '../consumers/marketplace-consumer';

const router = express.Router();

router.get('/test', consumer.test);

export = router;

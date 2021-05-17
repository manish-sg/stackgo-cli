import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Health Check Controller';

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Health check route called.');
    return res.status(200).json({
        message: 'pong'
    });
};

const protectedRouteController = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, ' Protected route called.');
    return res.status(200).json({
        message: 'protected pong'
    });
};

export default { serverHealthCheck, protectedRouteController };

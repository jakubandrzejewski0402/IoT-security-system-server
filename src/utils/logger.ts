import { NextFunction, Request } from 'express';
import logger from '../config/logger';
import { EVENT, LISTENER_SET_UP_FOR } from '../constants/logger';

export const logSetupEventListener = (eventType: string) => {
    logger.info(`${LISTENER_SET_UP_FOR} ${eventType} ${EVENT}`);
};

export const requestLogger = (req: Request, _: unknown, next: NextFunction) => {
    logger.info(`Received ${req.method} request at ${req.originalUrl}`);
    next();
};

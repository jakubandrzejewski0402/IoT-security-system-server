import { NextFunction, Request } from 'express';
import logger from '../config/logger.config';

export const logSetupEventListener = (eventType: string) => {
    logger.info(`Listener set up for ${eventType} event`);
};

export const logNotFoundDevice = (deviceId: string) => {
    logger.error(`Not found device with id: ${deviceId}`);
};

export const logRequest = (req: Request, _: unknown, next: NextFunction) => {
    logger.info(`Received ${req.method} request at ${req.originalUrl}`);
    next();
};

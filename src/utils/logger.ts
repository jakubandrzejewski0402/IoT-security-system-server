import logger from '../config/logger.config';
import { DeviceStatus } from '../constants/constants';
import { Request } from 'express';

export const logSetupEventListener = (eventType: string) => {
    logger.info(`Listener set up for ${eventType} event`);
};

export const logNotFound = (id: string, toFound: string) => {
    logger.error(`Not found ${toFound} with id: ${id}`);
};

export const logSuccesfullyChangedStatus = (
    deviceName: string,
    status: DeviceStatus
) => {
    logger.info(
        `Status changed successfully for device ${deviceName} to ${status}`
    );
};

export const logRequest = (req: Request) => {
    logger.info(
        `Received ${req.method} request at ${
            req.originalUrl
        }. Body: ${JSON.stringify(req.body)}. Header: ${JSON.stringify(
            req.headers
        )}`
    );
};

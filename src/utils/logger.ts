import logger from '../config/logger.config';
import { DeviceStatus } from '../constants/constants';

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

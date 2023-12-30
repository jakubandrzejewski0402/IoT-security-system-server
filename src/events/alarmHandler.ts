import logger from '../config/logger';
import { NOT_FOUND_DEVICE_WITH_ID } from '../constants/logger';
import { Device } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { sendSMS } from '../services/smsService';
import { EventData } from './events.interfaces';

export const handleAlarmArmed = async ({ deviceId }: EventData) => {
    setImmediate(async () => {
        logger.info(`Alarm Armed event for device ${deviceId} received.`);

        const device: Device | null = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logger.error(`${NOT_FOUND_DEVICE_WITH_ID} ${deviceId}`);
            return;
        }

        const messageBody = `Alarm armed for device ${device.name}`;
        await sendSMS(device.phoneNumber, messageBody);
    });
};

export const handleAlarmDisarmed = async ({ deviceId }: EventData) => {
    setImmediate(async () => {
        logger.info(`Alarm Disarmed event for device ${deviceId} received.`);

        const device: Device | null = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logger.error(`${NOT_FOUND_DEVICE_WITH_ID} ${deviceId}`);
            return;
        }

        const messageBody = `Alarm disarmed for device ${device.name}`;
        await sendSMS(device.phoneNumber, messageBody);
    });
};

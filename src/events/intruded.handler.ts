import logger from '../config/logger.config';
import { Device } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { sendSMS } from '../services/sms.service';
import { logNotFoundDevice } from '../utils/logger';
import { EventData } from './events.interfaces';

export const handleIntruded = ({ deviceId }: EventData) => {
    setImmediate(async () => {
        logger.info(`Intruded event for device ${deviceId} received.`);

        const device: Device | null = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logNotFoundDevice(deviceId);
            return;
        }

        const messageBody = `Intrusion detected for device ${device.name}`;
        await sendSMS(device.ownerPhoneNumber, messageBody);
    });
};

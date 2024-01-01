import logger from '../config/logger.config';
import { Device, User } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { UserRepository } from '../repository/user.repository';
import { sendSMS } from '../services/sms.service';
import { logNotFound } from '../utils/logger';
import { EventData } from './events.interfaces';

export const handleIntruded = ({ deviceId }: EventData) => {
    setImmediate(async () => {
        logger.info(`Intruded event for device ${deviceId} received.`);

        const device: Device | null = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logNotFound(deviceId, 'device');
            return;
        }

        const user: User | null = await UserRepository.findOne(device.ownerId);
        if (!user) {
            logNotFound(device.ownerId, 'user');
            return;
        }

        const now = Date.now();
        DeviceRepository.updateLastMovementDate(deviceId, now);

        const messageBody = `Intrusion detected for device ${device.name}`;
        await sendSMS(user.phoneNumber, messageBody);
    });
};

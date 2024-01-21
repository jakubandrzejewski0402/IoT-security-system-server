import logger from '../config/logger.config';
import { Device, User } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { UserRepository } from '../repository/user.repository';
import { sendSMS } from '../services/sms.service';
import { logNotFound } from '../utils/logger';
import { createGasLevelAlertSmsMessage } from '../utils/sms.messages';
import { GasEventData } from './events.interfaces';

export const handleGas = ({ deviceId, gasLevel }: GasEventData) => {
    setImmediate(async () => {
        logger.info(`Gas level alert for device ${deviceId} received.`);

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

        const messageBody = createGasLevelAlertSmsMessage(
            device.name,
            gasLevel
        );
        await sendSMS(user.phoneNumber, messageBody);
    });
};

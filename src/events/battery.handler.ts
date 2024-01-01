import logger from '../config/logger.config';
import { Device, User } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { UserRepository } from '../repository/user.repository';
import { sendSMS } from '../services/sms.service';
import { logNotFound } from '../utils/logger';
import { BatteryEventData } from './events.interfaces';

export const handleBattery = ({ deviceId, batteryLevel }: BatteryEventData) => {
    setImmediate(async () => {
        logger.info(
            `Battery event for device ${deviceId} received. Battery level: ${batteryLevel}%`
        );

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

        const messageBody = `Current battery level for device ${device.name} is ${batteryLevel}%. Remember to keep device charged.`;
        sendSMS(user.phoneNumber, messageBody);
    });
};

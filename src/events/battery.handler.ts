import logger from '../config/logger.config';
import { Device } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { sendSMS } from '../services/sms.service';
import { logNotFoundDevice } from '../utils/logger';
import { BatteryEventData } from './events.interfaces';

export const handleBattery = ({ deviceId, batteryLevel }: BatteryEventData) => {
    setImmediate(async () => {
        logger.info(
            `Battery event for device ${deviceId} received. Battery level: ${batteryLevel}%`
        );

        const device: Device | null = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logNotFoundDevice(deviceId);
            return;
        }

        const messageBody = `Battery level for device ${device.name}`;
        sendSMS(device.ownerPhoneNumber, messageBody);
    });
};

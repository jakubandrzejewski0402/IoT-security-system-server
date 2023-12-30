import logger from '../config/logger';
import { NOT_FOUND_DEVICE_WITH_ID } from '../constants/logger';
import { Device } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { sendSMS } from '../services/smsService';
import { LowBatteryEventData } from './events.interfaces';

export const handleLowBattery = async ({
    deviceId,
    batteryLevel,
}: LowBatteryEventData) => {
    logger.info(
        `Battery event for device ${deviceId} received. Battery level: ${batteryLevel}%`
    );

    const device: Device | null = await DeviceRepository.findOne(deviceId);
    if (!device) {
        logger.error(`${NOT_FOUND_DEVICE_WITH_ID} ${deviceId}`);
        return;
    }

    const messageBody = `Battery level for device ${device.name}`;
    sendSMS(device.phoneNumber, messageBody);
};

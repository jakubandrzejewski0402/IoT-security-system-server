import logger from '../../config/logger.config';
import { DeviceStatus } from '../../constants/constants';
import { Device, User } from '../../db/mongo.interfaces';
import { DeviceRepository } from '../../repository/device.repository';
import { logNotFound, logSuccesfullyChangedStatus } from '../logger';
import { sendChangeAlarmStatusSMS } from '../sms';

const lastChangeTimestamps: Map<string, number> = new Map();

const isValidStatusChange = (
    currentStatus: DeviceStatus,
    statusToSet: DeviceStatus
): boolean => {
    if (currentStatus === DeviceStatus.ARMED) {
        return statusToSet === DeviceStatus.DISARMED;
    }
    return statusToSet === DeviceStatus.ARMED;
};

export const canChangeStatus = (
    deviceId: string,
    currentStatus: DeviceStatus,
    statusToSet: DeviceStatus
): boolean => {
    const semaphoreDelay = 7000;
    const lastChange = lastChangeTimestamps.get(deviceId);
    const now = Date.now();

    const canChange = !lastChange || now - lastChange >= semaphoreDelay;
    const isValid = isValidStatusChange(currentStatus, statusToSet);
    const isChangeAllowed = canChange && isValid;

    if (isChangeAllowed) lastChangeTimestamps.set(deviceId, now);

    return isChangeAllowed;
};

export const retryChangeStatus = async (
    deviceId: string,
    statusToSet: DeviceStatus,
    user: User
) => {
    const retryDelay = 14000;

    setTimeout(async () => {
        const device = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logNotFound(deviceId, 'device');
            return;
        }

        if (canChangeStatus(deviceId, device.status, statusToSet)) {
            await changeStatusAndNotifyUser(device, statusToSet, user);
            return;
        }

        logger.error(`Failed to change status for device ${device.name}`);
    }, retryDelay);
};

export const changeStatusAndNotifyUser = async (
    device: Device,
    statusToSet: DeviceStatus,
    user: User
) => {
    await DeviceRepository.updateStatus(device.id, statusToSet);
    logSuccesfullyChangedStatus(device.id, statusToSet);
    await sendChangeAlarmStatusSMS(user.phoneNumber, device.name, statusToSet);
};

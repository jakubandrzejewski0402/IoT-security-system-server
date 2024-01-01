import logger from '../../config/logger.config';
import {
    ChangeStatusParams,
    DeviceStatus,
    RetryParams,
} from '../../constants/constants';
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

export const canChangeStatus = ({
    deviceId,
    currentStatus,
    statusToSet,
}: ChangeStatusParams): boolean => {
    const delayToChangeStatus = 7000;

    const lastChange = lastChangeTimestamps.get(deviceId);
    const now = Date.now();

    const canChange = !lastChange || now - lastChange >= delayToChangeStatus;
    const isValid = isValidStatusChange(currentStatus, statusToSet);
    if (canChange && isValid) lastChangeTimestamps.set(deviceId, now);

    return canChange && isValid;
};

export const retryChangeStatus = async ({
    deviceId,
    statusToSet,
    user,
}: RetryParams) => {
    const retryDelay = 14000;

    setTimeout(async () => {
        const device = await DeviceRepository.findOne(deviceId);
        if (!device) {
            logNotFound(deviceId, 'device');
            return;
        }

        if (
            canChangeStatus({
                deviceId,
                currentStatus: device.status,
                statusToSet,
            })
        ) {
            await DeviceRepository.updateStatus(deviceId, statusToSet);
            logSuccesfullyChangedStatus(deviceId, statusToSet);
            await sendChangeAlarmStatusSMS(
                user.phoneNumber,
                device.name,
                statusToSet
            );
        } else {
            logger.error(`Failed to change status for device ${deviceId}`);
        }
    }, retryDelay);
};

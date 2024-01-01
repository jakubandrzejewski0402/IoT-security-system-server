import logger from '../config/logger.config';
import { DeviceStatus } from '../constants/constants';
import { EventType } from '../constants/event.type';
import { Device, User } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { UserRepository } from '../repository/user.repository';
import {
    canChangeStatus,
    changeStatusAndNotifyUser,
    retryChangeStatus,
} from '../utils/events/event.handler';
import { logNotFound } from '../utils/logger';
import { EventData } from './events.interfaces';

const tryChangingStatus = async (
    device: Device,
    currentStatus: DeviceStatus,
    statusToSet: DeviceStatus,
    user: User
) => {
    if (canChangeStatus(device.id, currentStatus, statusToSet)) {
        await changeStatusAndNotifyUser(device, statusToSet, user);
        return;
    }

    await retryChangeStatus(device.id, statusToSet, user);
};

export const handleAlarmStatusChange = ({ deviceId, eventType }: EventData) => {
    setImmediate(async () => {
        logger.info(
            `Change alarm status event for device ${deviceId} received. Event type: ${eventType}`
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

        const currentStatus = device.status;
        const statusToSet =
            eventType === EventType.ALARM_ARMED
                ? DeviceStatus.ARMED
                : DeviceStatus.DISARMED;

        await tryChangingStatus(device, currentStatus, statusToSet, user);
    });
};

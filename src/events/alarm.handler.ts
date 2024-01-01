import logger from '../config/logger.config';
import {
    DeviceStatus,
    EventType,
    changeStatusIfPossibleParams,
} from '../constants/constants';
import { Device, User } from '../db/mongo.interfaces';
import { DeviceRepository } from '../repository/device.repository';
import { UserRepository } from '../repository/user.repository';
import {
    canChangeStatus,
    retryChangeStatus,
} from '../utils/events/event.handler';
import { logNotFound, logSuccesfullyChangedStatus } from '../utils/logger';
import { sendChangeAlarmStatusSMS } from '../utils/sms';
import { EventData } from './events.interfaces';

const changeStatusIfPossible = async ({
    device,
    currentStatus,
    statusToSet,
    user,
}: changeStatusIfPossibleParams) => {
    if (
        canChangeStatus({
            deviceId: device.id,
            currentStatus,
            statusToSet,
        })
    ) {
        await DeviceRepository.updateStatus(device.id, statusToSet);
        logSuccesfullyChangedStatus(device.id, statusToSet);
        await sendChangeAlarmStatusSMS(
            user.phoneNumber,
            device.name,
            statusToSet
        );
    } else
        await retryChangeStatus({
            deviceId: device.id,
            statusToSet,
            user,
        });
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

        await changeStatusIfPossible({
            device,
            currentStatus,
            statusToSet,
            user,
        });
    });
};

import { Device, User } from '../db/mongo.interfaces';

export const ALARM_PATH = 'alarm';
export const BATTERY_PATH = 'battery';

export enum EventType {
    ALARM_ARMED = 'alarm-armed',
    ALARM_DISARMED = 'alarm-disarmed',
    BATTERY = 'battery',
    INTRUDED = 'intruded',
}

export enum DeviceStatus {
    ARMED = 'armed',
    DISARMED = 'dis-armed',
}

export enum HTTP_CODE {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export type ChangeStatusParams = {
    deviceId: string;
    currentStatus: DeviceStatus;
    statusToSet: DeviceStatus;
};

export type RetryParams = {
    deviceId: string;
    statusToSet: DeviceStatus;
    user: User;
};

export type changeStatusIfPossibleParams = {
    device: Device;
    currentStatus: DeviceStatus;
    statusToSet: DeviceStatus;
    user: User;
};

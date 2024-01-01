import { DeviceStatus, EventType } from '../constants/constants';

export interface Device {
    id: string;
    name: string;
    ownerId: string;
    status: DeviceStatus;
    lastMovementDate: number;
}

export interface Event {
    id: string;
    deviceId: string;
    type: EventType;
    eventParams: object;
    dateOfCreation: number;
}

export interface User {
    id: string;
    name: string;
    phoneNumber: string;
}

import { DeviceStatus } from '../constants/constants';
import { EventType } from '../constants/event.type';

export interface Device {
    id: string;
    name: string;
    ownerId: string;
    status: DeviceStatus;
    lastMovementDate: number;
}

export interface InternalEvent {
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

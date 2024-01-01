import { EventType } from '../constants/constants';

export type EventData = {
    deviceId: string;
    eventType: EventType;
};

export type BatteryEventData = EventData & { batteryLevel: number };

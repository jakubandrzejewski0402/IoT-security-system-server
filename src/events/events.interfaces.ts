import { EventType } from '../constants/event.type';

export type EventData = {
    deviceId: string;
    eventType: EventType;
};

export type BatteryEventData = EventData & { batteryLevel: number };

export type EventData = {
    deviceId: string;
    eventType: string;
};

export type BatteryEventData = EventData & { batteryLevel: number };

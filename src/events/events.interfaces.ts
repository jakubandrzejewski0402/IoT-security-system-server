export type EventData = {
    deviceId: string;
};

export type LowBatteryEventData = EventData & { batteryLevel: number };

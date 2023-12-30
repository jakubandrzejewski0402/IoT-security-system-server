export interface Device {
    id: string;
    name: string;
    phoneNumber: string;
}

export interface Action {
    deviceId: string;
    actionType: string;
    actionBody: object;
    timestamp: number;
}

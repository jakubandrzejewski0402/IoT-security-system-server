export interface Device {
    id: string;
    name: string;
    ownerPhoneNumber: string;
}

export interface Event {
    id: string;
    deviceId: string;
    type: string;
    data: object;
    dateOfCreation: number;
}

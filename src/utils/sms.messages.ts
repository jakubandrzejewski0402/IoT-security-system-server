export const createBatterySmsMessage = (
    deviceName: String,
    batteryLevel: number,
    userName: string
): string =>
    `Hello ${userName},\nJust a heads-up: Your device ${deviceName} is at ${batteryLevel}% battery. Please charge it soon to ensure uninterrupted usage.\nBest,\nYour Security Service Team`;

export const createIntrusionSmsMessage = (deviceName: string): string =>
    `Alert: Intrusion detected on your ${deviceName}. Please check immediately. Contact us if assistance is needed. Stay Safe!`;

export const createChangeStatusSmsMessage = (
    deviceName: string,
    statusToSet: string
): string =>
    `Notice: The alarm status for your device ${deviceName} has been set to ${statusToSet}. Please verify and contact us if this was not initiated by you.`;

export const createGasLevelAlertSmsMessage = (
    deviceName: string,
    gasLevel: number
): string =>
    `Warning: Abnormal gas level detected on your ${deviceName}. Current level: ${gasLevel} ppm. Please check the area immediately and take necessary precautions.`;

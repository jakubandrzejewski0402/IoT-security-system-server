import { DeviceStatus } from '../constants/constants';
import { sendSMS } from '../services/sms.service';

export const sendChangeAlarmStatusSMS = async (
    phoneNumber: string,
    deviceName: string,
    statusToSet: DeviceStatus
) => {
    const messageBody = `Alarm status changed for device ${deviceName} to ${statusToSet}`;
    await sendSMS(phoneNumber, messageBody);
};

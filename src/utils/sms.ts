import { DeviceStatus } from '../constants/constants';
import { sendSMS } from '../services/sms.service';
import { createChangeStatusSmsMessage } from './sms.messages';

export const sendChangeAlarmStatusSMS = async (
    phoneNumber: string,
    deviceName: string,
    statusToSet: DeviceStatus
) => {
    const messageBody = createChangeStatusSmsMessage(deviceName, statusToSet);
    await sendSMS(phoneNumber, messageBody);
};

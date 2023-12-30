import twilio from 'twilio';
import { appConfig } from '../config/appConfig';
import logger from '../config/logger';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

const twilioClient = twilio(
    appConfig.TWILIO_ACCOUNT_SID,
    appConfig.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to: string, body: string) => {
    const message: MessageInstance = await twilioClient.messages.create({
        body,
        from: appConfig.TWILIO_PHONE_NUMBER,
        to,
    });
    logger.info(`SMS sent successfully to ${to}. SID: ${message.sid}`);
};

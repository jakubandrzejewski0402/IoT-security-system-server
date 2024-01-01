import Twilio from 'twilio';
import logger from '../config/logger.config';
import { appConfig } from '../config/app.config';

const twilioClient = Twilio(
    appConfig.TWILIO_ACCOUNT_SID,
    appConfig.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to: string, body: string) => {
    try {
        const message = await twilioClient.messages.create({
            body: body,
            to: to,
            from: appConfig.TWILIO_PHONE_NUMBER,
        });

        logger.info(
            `SMS sent successfully to ${to}. Message SID: ${message.sid}`
        );
    } catch (error: any) {
        logger.error(`Failed to send SMS to ${to}: ${error.message}`);
        throw error;
    }
};

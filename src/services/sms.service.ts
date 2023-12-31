import { snsClient } from '../config/aws.config';
import { PublishCommand } from '@aws-sdk/client-sns';
import logger from '../config/logger.config';

export const sendSMS = async (to: string, body: string) => {
    const params = {
        Message: body,
        PhoneNumber: to,
    };

    try {
        const publishCommand = new PublishCommand(params);
        const res = await snsClient.send(publishCommand);
        logger.info(
            `SMS sent successfully to ${to}. Message ID: ${res.MessageId}`
        );
    } catch (error: any) {
        logger.error(`Failed to send SMS to ${to}: ${error.message}`);
        throw error;
    }
};

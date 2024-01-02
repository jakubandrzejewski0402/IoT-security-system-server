import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import logger from '../config/logger.config';
import { appConfig } from '../config/app.config';

const snsClient = new SNSClient({
    region: appConfig.AWS_REGION,
});

export const sendSMS = async (to: string, body: string) => {
    try {
        const params = {
            Message: body,
            PhoneNumber: to,
        };

        const command = new PublishCommand(params);
        const response = await snsClient.send(command);

        logger.info(
            `SMS sent successfully to ${to}. Message ID: ${response.MessageId}`
        );
    } catch (error: any) {
        logger.error(`Failed to send SMS to ${to}: ${error.message}`);
        throw error;
    }
};

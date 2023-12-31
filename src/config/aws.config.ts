import { SNSClient } from '@aws-sdk/client-sns';
import { appConfig } from '../config/app.config';

export const snsClient = new SNSClient({
    region: appConfig.AWS_REGION,
    credentials: {
        accessKeyId: appConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_SECRET_ACCESS_KEY,
    },
});

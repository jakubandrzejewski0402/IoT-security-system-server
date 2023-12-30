import dotenv from 'dotenv-flow';

dotenv.config();

const required = (key: string, variable: string | undefined): string => {
    if (!variable)
        throw new Error(
            `Required property is missing: ${key} on level ${process.env.NODE_ENV}`
        );
    return variable;
};

export const appConfig = {
    PORT: process.env.PORT,
    MONGO_URL: required('MONGO_URL', process.env.MONGO_URL),
    TWILIO_ACCOUNT_SID: required(
        'TWILIO_ACCOUNT_SID',
        process.env.TWILIO_ACCOUNT_SID
    ),
    TWILIO_AUTH_TOKEN: required(
        'TWILIO_AUTH_TOKEN',
        process.env.TWILIO_AUTH_TOKEN
    ),
    TWILIO_PHONE_NUMBER: required(
        'TWILIO_PHONE_NUMBER',
        process.env.TWILIO_PHONE_NUMBER
    ),
};

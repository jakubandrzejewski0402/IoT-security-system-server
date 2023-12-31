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
    PROTOCOL: process.env.PROTOCOL || 'http',
    HOSTNAME: process.env.HOSTNAME || 'localhost',
    PORT: process.env.PORT || 3000,
    MONGO_URL: required('MONGO_URL', process.env.MONGO_URL),
    AWS_ACCESS_KEY_ID: required(
        'AWS_ACCESS_KEY_ID',
        process.env.AWS_ACCESS_KEY_ID
    ),
    AWS_SECRET_ACCESS_KEY: required(
        'AWS_SECRET_ACCESS_KEY',
        process.env.AWS_SECRET_ACCESS_KEY
    ),
    AWS_REGION: required('AWS_REGION', process.env.AWS_REGION),
};

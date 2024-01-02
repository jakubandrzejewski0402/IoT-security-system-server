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
    PROTOCOL: process.env.PROTOCOL,
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT || 3000,
    MONGO_URL: required('MONGO_URL', process.env.MONGO_URL),
    AWS_REGION: required('AWS_REGION', process.env.AWS_REGION),
};

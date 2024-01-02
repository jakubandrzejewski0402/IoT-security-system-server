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
    PORT: process.env.PORT || 3000,
    NODE_ENV: required('NODE_ENV', process.env.NODE_ENV),
    MONGO_URL: required('MONGO_URL', process.env.MONGO_URL),
    AWS_REGION: required('AWS_REGION', process.env.AWS_REGION),
};

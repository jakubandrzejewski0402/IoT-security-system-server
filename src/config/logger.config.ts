import { createLogger, format, transports } from 'winston';
import { appConfig } from './app.config';
import { LOGS } from '../constants/db';
import 'winston-mongodb';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }): string => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), logFormat),
        }),
        new transports.MongoDB({
            db: appConfig.MONGO_URL,
            collection: LOGS,
            level: 'info',
            options: {
                useUnifiedTopology: true,
            },
            format: format.combine(format.timestamp(), format.json()),
        }),
    ],
});

export default logger;

import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import { appConfig } from './appConfig';
import { LOGS } from '../constants/db';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ timestamp, level, message }): string => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), myFormat),
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

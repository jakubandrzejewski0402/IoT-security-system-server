import express, { Express } from 'express';
import alarmController from './controllers/alarm.controller';
import batteryController from './controllers/battery.controller';
import { errorHandler } from './error/error.handler';
import { logRequest } from './utils/logger';
import { saveEvent } from './utils/events/event.interceptor';

const app: Express = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(logRequest)
    .use(saveEvent)
    .use(alarmController)
    .use(batteryController)
    .use(errorHandler);

export default app;

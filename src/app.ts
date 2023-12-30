import express, { Express } from 'express';
import alarmArmedController from './controllers/alarmController';
import intrudedController from './controllers/intrudedController';
import lowBatteryController from './controllers/lowBatteryController';
import { errorHandler } from './error/error.handler';
import { requestLogger } from './utils/logger';

const app: Express = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(requestLogger)
    .use(alarmArmedController)
    .use(intrudedController)
    .use(lowBatteryController)
    .use(errorHandler);

export default app;

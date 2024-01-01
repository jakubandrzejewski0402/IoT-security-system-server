import express, { Express } from 'express';
import alarmController from './controllers/event.controller';
import { errorHandler } from './error/error.handler';
import { saveAndLogEvent } from './utils/events/event.interceptor';

const app: Express = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(saveAndLogEvent)
    .use(alarmController)
    .use(errorHandler);

export default app;

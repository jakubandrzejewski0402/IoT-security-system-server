import { EventRepository } from '../../repository/event.repository';
import { InternalEvent } from '../../db/mongo.interfaces';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import logger from '../../config/logger.config';

export const saveAndLogEvent = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const { eventType, deviceId, ...rest } = req.body;
    const event: InternalEvent = {
        id: uuid(),
        deviceId: deviceId,
        type: eventType,
        eventParams: rest,
        dateOfCreation: Date.now(),
    };
    await EventRepository.insertOne(event);
    logger.info(`Received ${req.method} request at ${req.originalUrl}`);
    next();
};

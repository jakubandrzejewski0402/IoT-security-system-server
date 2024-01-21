import { EventRepository } from '../../repository/event.repository';
import { InternalEvent } from '../../db/mongo.interfaces';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { logRequest } from '../logger';

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
    logRequest(req);
    next();
};

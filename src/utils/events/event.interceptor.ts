import { EventRepository } from '../../repository/event.repository';
import { Event } from '../../db/mongo.interfaces';
import { NextFunction, Request } from 'express';
import { v4 as uuid } from 'uuid';

export const saveEvent = async (
    req: Request,
    _: unknown,
    next: NextFunction
) => {
    const { eventType, deviceId } = req.body;
    const event: Event = {
        id: uuid(),
        deviceId: deviceId,
        type: eventType,
        data: req.body,
        dateOfCreation: Date.now(),
    };
    await EventRepository.insertOne(event);
    next();
};

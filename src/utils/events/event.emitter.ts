import EventEmitter from 'eventemitter3';
import { NextFunction, Request } from 'express';

export const eventEmitter: EventEmitter = new EventEmitter();

export const emitEvent = (req: Request, _: unknown, next: NextFunction) => {
    const { eventType } = req.body;
    eventEmitter.emit(eventType, req.body);
    next();
};

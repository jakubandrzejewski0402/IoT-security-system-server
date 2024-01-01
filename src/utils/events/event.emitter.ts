import EventEmitter from 'eventemitter3';
import { NextFunction, Request, Response } from 'express';

export const eventEmitter: EventEmitter = new EventEmitter();

export const emitEvent = (req: Request, _: Response, next: NextFunction) => {
    const { eventType } = req.body;
    eventEmitter.emit(eventType, req.body);
    next();
};

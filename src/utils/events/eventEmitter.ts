import EventEmitter from 'eventemitter3';
import { NextFunction, Request } from 'express';

export const eventEmitter: EventEmitter = new EventEmitter();

export const emitEvent =
    (eventType: string) => (req: Request, _: unknown, next: NextFunction) => {
        eventEmitter.emit(eventType, req.body);
        next();
    };

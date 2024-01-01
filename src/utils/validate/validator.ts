import { Request, NextFunction, Response } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';
import { ValidationError } from '../../error/error.module';
import {
    alarmArmedSchema,
    alarmDisarmedSchema,
    batterySchema,
    intruderSchema,
} from './validation.schemas';
import { EventType } from '../../constants/event.type';

export const findSchema = (eventType: string) => {
    switch (eventType) {
        case EventType.ALARM_ARMED:
            return alarmArmedSchema;
        case EventType.ALARM_DISARMED:
            return alarmDisarmedSchema;
        case EventType.INTRUDED:
            return intruderSchema;
        case EventType.BATTERY:
            return batterySchema;
        default:
            return null;
    }
};

export const validateRequest = (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const schema: ObjectSchema | null = findSchema(req.body.eventType);
    if (!schema) throw new ValidationError(req.body, ['Invalid event type']);

    const { error }: ValidationResult = schema.validate(req.body);
    if (error) {
        const validationErrors: string[] = error.details.map(
            (detail) => detail.message
        );
        throw new ValidationError(req.body, validationErrors);
    }
    next();
};

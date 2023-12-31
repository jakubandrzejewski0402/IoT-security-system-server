import { Request, NextFunction } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';
import { ValidationError } from '../../error/error.module';
import {
    ALARM_ARMED,
    ALARM_DISARMED,
    BATTERY,
    INTRUDED,
} from '../../constants/event.types';
import {
    alarmArmedSchema,
    alarmDisarmedSchema,
    batterySchema,
    intruderSchema,
} from './validation.schemas';

export const findSchema = (eventType: string) => {
    if (eventType === ALARM_ARMED) return alarmArmedSchema;
    if (eventType === ALARM_DISARMED) return alarmDisarmedSchema;
    if (eventType === INTRUDED) return intruderSchema;
    if (eventType === BATTERY) return batterySchema;
    return null;
};

export const validateRequest = (
    req: Request,
    _: unknown,
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

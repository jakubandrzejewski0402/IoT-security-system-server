import { Request, NextFunction } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';
import { ValidationError } from '../../error/error.module';

export const validateRequest =
    (schema: ObjectSchema) =>
    (req: Request, _: unknown, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body);
        if (error) {
            const validationErrors: string[] = error.details.map(
                (detail) => detail.message
            );
            throw new ValidationError(req.body, validationErrors);
        }
        next();
    };

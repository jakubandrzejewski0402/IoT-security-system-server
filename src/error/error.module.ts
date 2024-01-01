import { HTTP_CODE } from '../constants/constants';
import { ErrorCodes } from './error.codes';

export interface AppError {
    status: number;
    code: string;
    data: string;
}

export class ValidationError implements AppError {
    status = HTTP_CODE.BAD_REQUEST;
    code = ErrorCodes.VALIDATION_ERROR;
    data;

    constructor(inputValue: string, validationErrors?: string[]) {
        this.data = `${JSON.stringify(
            inputValue
        )} is not assignable to required type, ${validationErrors}`;
    }
}

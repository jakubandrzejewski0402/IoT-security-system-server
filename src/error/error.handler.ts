import logger from '../config/logger.config';
import { HTTP_CODE } from '../constants/constants';
import { AppError } from './error.module';
import { NextFunction, Request, Response } from 'express';

interface ErrorHandler {
    (
        error: Error | AppError,
        req: Request,
        res: Response,
        next: NextFunction
    ): void;
}

const internalServerError = {
    code: 'internal/error',
    data: "Temporary technical issue. We're fixing it. Thanks for your patience!",
};

export const errorHandler: ErrorHandler = (
    error: Error | AppError,
    _: Request,
    res: Response,
    next: NextFunction
) => {
    const status =
        (error as AppError)?.status || HTTP_CODE.INTERNAL_SERVER_ERROR;

    const code = (error as AppError).code;
    const data = (error as AppError).data;

    const response =
        status !== HTTP_CODE.INTERNAL_SERVER_ERROR
            ? {
                  code,
                  data,
              }
            : internalServerError;

    logger.error(data);
    res.status(status).json(response);
};

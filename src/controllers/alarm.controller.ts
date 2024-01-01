import express, { Request, Response, Router } from 'express';
import { emitEvent } from '../utils/events/event.emitter';
import { validateRequest } from '../utils/validate/validator';
import { ALARM_PATH, HTTP_CODE } from '../constants/constants';

const router: Router = express.Router();

router.put(
    `/${ALARM_PATH}`,
    validateRequest,
    emitEvent,
    (_: Request, res: Response) => {
        res.sendStatus(HTTP_CODE.CREATED);
    }
);

export default router;

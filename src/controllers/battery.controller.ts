import express, { Request, Response, Router } from 'express';
import { emitEvent } from '../utils/events/event.emitter';
import { BATTERY_PATH, HTTP_CODE } from '../constants/constants';
import { validateRequest } from '../utils/validate/validator';

const router: Router = express.Router();

router.put(
    `/${BATTERY_PATH}`,
    validateRequest,
    emitEvent,
    (_: Request, res: Response) => {
        res.sendStatus(HTTP_CODE.CREATED);
    }
);

export default router;

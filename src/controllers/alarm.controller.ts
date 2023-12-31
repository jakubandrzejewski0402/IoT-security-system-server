import express, { Request, Response, Router } from 'express';
import { emitEvent } from '../utils/events/event.emitter';
import { HTTP_CODE } from '../constants/http.codes';
import { ALARM_PATH } from '../constants/paths';
import { validateRequest } from '../utils/validate/validator';

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

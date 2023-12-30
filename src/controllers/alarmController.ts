import express, { Response, Router } from 'express';
import { emitEvent } from '../utils/events/eventEmitter';
import { ALARM_ARMED, ALARM_DISARMED } from '../constants/eventTypes';
import { HTTP_CODE } from '../constants/http.codes';
import { ALARM_PATH, ARMED_PATH, DISARMED_PATH } from '../constants/paths';
import { validateRequest } from '../utils/validate/validator';
import {
    alarmArmedSchema,
    alarmDisarmedSchema,
} from '../utils/validate/validationSchemas';

const router: Router = express.Router();

router.post(
    `/${ALARM_PATH}/${ARMED_PATH}`,
    validateRequest(alarmArmedSchema),
    emitEvent(ALARM_ARMED),
    (_: unknown, res: Response) => {
        res.sendStatus(HTTP_CODE.CREATED);
    }
);

router.post(
    `/${ALARM_PATH}/${DISARMED_PATH}`,
    validateRequest(alarmDisarmedSchema),
    emitEvent(ALARM_DISARMED),
    (_: unknown, res: Response) => {
        res.sendStatus(HTTP_CODE.CREATED);
    }
);

export default router;

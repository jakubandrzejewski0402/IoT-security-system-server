import express, { Response, Router } from 'express';
import { emitEvent } from '../utils/events/eventEmitter';
import { BATTERY } from '../constants/eventTypes';
import { BATTERY_PATH } from '../constants/paths';
import { HTTP_CODE } from '../constants/http.codes';
import { validateRequest } from '../utils/validate/validator';
import { lowBatterySchema } from '../utils/validate/validationSchemas';

const router: Router = express.Router();

router.post(
    `/${BATTERY_PATH}`,
    validateRequest(lowBatterySchema),
    emitEvent(BATTERY),
    (_: unknown, res: Response) => {
        res.sendStatus(HTTP_CODE.CREATED);
    }
);

export default router;

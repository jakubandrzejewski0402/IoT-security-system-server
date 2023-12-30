import express, { Response, Router } from 'express';
import { emitEvent } from '../utils/events/eventEmitter';
import { INTRUDED } from '../constants/eventTypes';
import { HTTP_CODE } from '../constants/http.codes';
import { validateRequest } from '../utils/validate/validator';
import { intruderSchema } from '../utils/validate/validationSchemas';

const router: Router = express.Router();

router.post(
    `/${INTRUDED}`,
    validateRequest(intruderSchema),
    emitEvent(INTRUDED),
    (_: unknown, res: Response) => {
        res.sendStatus(HTTP_CODE.CREATED);
    }
);

export default router;

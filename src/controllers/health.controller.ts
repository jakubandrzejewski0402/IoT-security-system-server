import express, { Router, Request, Response } from 'express';
import { HTTP_CODE } from '../constants/constants';

const router: Router = express.Router();

router.get(`/health`, (_: Request, res: Response) => {
    res.sendStatus(HTTP_CODE.OK);
});

export default router;

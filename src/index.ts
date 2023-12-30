import app from './app';
import { appConfig } from './config/appConfig';
import logger from './config/logger';
import {
    SERVER_IS_RUNNING_AT,
    STARTING_SERVER_ON_PORT,
} from './constants/logger';
import { Mongo } from './db/mongo';
import { setupEventListeners } from './utils/events/setupEventListeners';

Mongo.connect(appConfig.MONGO_URL).then(() => {
    logger.info(`${STARTING_SERVER_ON_PORT} ${appConfig.PORT}`);

    setupEventListeners();

    app.listen(appConfig.PORT, () => {
        logger.info(
            `${SERVER_IS_RUNNING_AT} http://localhost:${appConfig.PORT}`
        );
    });
});

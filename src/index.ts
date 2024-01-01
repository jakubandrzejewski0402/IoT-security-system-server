import app from './app';
import { appConfig } from './config/app.config';
import logger from './config/logger.config';
import { Mongo } from './db/mongo';
import { setupEventListeners } from './utils/events/setup.event.listeners';

Mongo.connect(appConfig.MONGO_URL).then(() => {
    setupEventListeners();

    app.listen(appConfig.PORT, () => {
        logger.info(
            `Server is running at ${appConfig.PROTOCOL}://${appConfig.HOSTNAME}:${appConfig.PORT}`
        );
    });
});

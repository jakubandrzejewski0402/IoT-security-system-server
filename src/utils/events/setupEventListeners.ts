import { eventEmitter } from './eventEmitter';
import {
    handleAlarmArmed,
    handleAlarmDisarmed,
} from '../../events/alarmHandler';
import { handleLowBattery } from '../../events/lowBatteryHandler';
import { handleIntruded } from '../../events/intrudedHandler';
import {
    ALARM_ARMED,
    ALARM_DISARMED,
    BATTERY,
    INTRUDED,
} from '../../constants/eventTypes';
import { logSetupEventListener } from '../logger';

export const setupEventListeners = () => {
    eventEmitter.on(ALARM_ARMED, handleAlarmArmed);
    logSetupEventListener(ALARM_ARMED);

    eventEmitter.on(ALARM_DISARMED, handleAlarmDisarmed);
    logSetupEventListener(ALARM_DISARMED);

    eventEmitter.on(BATTERY, handleLowBattery);
    logSetupEventListener(BATTERY);

    eventEmitter.on(INTRUDED, handleIntruded);
    logSetupEventListener(INTRUDED);
};

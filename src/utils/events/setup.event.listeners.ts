import { eventEmitter } from './event.emitter';
import {
    handleAlarmArmed,
    handleAlarmDisarmed,
} from '../../events/alarm.handler';
import { handleBattery } from '../../events/battery.handler';
import { handleIntruded } from '../../events/intruded.handler';
import {
    ALARM_ARMED,
    ALARM_DISARMED,
    BATTERY,
    INTRUDED,
} from '../../constants/event.types';
import { logSetupEventListener } from '../logger';

type EventHandler = (...args: any[]) => void;

const setupListener = (eventName: string, handler: EventHandler) => {
    eventEmitter.on(eventName, handler);
    logSetupEventListener(eventName);
};

export const setupEventListeners = () => {
    setupListener(ALARM_ARMED, handleAlarmArmed);
    setupListener(ALARM_DISARMED, handleAlarmDisarmed);
    setupListener(BATTERY, handleBattery);
    setupListener(INTRUDED, handleIntruded);
};

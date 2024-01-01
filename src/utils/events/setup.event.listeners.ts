import { eventEmitter } from './event.emitter';
import { handleAlarmStatusChange } from '../../events/alarm.handler';
import { handleBattery } from '../../events/battery.handler';
import { handleIntruded } from '../../events/intruded.handler';
import { logSetupEventListener } from '../logger';
import { EventType } from '../../constants/constants';

type EventHandler = (...args: any[]) => void;

const setupListener = (eventName: string, handler: EventHandler) => {
    eventEmitter.on(eventName, handler);
    logSetupEventListener(eventName);
};

export const setupEventListeners = () => {
    setupListener(EventType.ALARM_ARMED, handleAlarmStatusChange);
    setupListener(EventType.ALARM_DISARMED, handleAlarmStatusChange);
    setupListener(EventType.BATTERY, handleBattery);
    setupListener(EventType.INTRUDED, handleIntruded);
};

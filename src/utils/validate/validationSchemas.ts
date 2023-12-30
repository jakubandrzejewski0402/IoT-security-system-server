import Joi from 'joi';

export const alarmArmedSchema = Joi.object({
    deviceId: Joi.string().required(),
});

export const alarmDisarmedSchema = Joi.object({
    deviceId: Joi.string().required(),
});

export const intruderSchema = Joi.object({
    deviceId: Joi.string().required(),
});

export const lowBatterySchema = Joi.object({
    deviceId: Joi.string().required(),
    batteryLevel: Joi.number().min(0).max(100).required(),
});

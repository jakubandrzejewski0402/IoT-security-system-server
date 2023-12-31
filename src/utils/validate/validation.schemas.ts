import Joi from 'joi';

export const alarmArmedSchema = Joi.object({
    eventType: Joi.string().required(),
    deviceId: Joi.string().required(),
});

export const alarmDisarmedSchema = Joi.object({
    eventType: Joi.string().required(),
    deviceId: Joi.string().required(),
});

export const intruderSchema = Joi.object({
    eventType: Joi.string().required(),
    deviceId: Joi.string().required(),
});

export const batterySchema = Joi.object({
    eventType: Joi.string().required(),
    deviceId: Joi.string().required(),
    batteryLevel: Joi.number().min(0).max(100).required(),
});

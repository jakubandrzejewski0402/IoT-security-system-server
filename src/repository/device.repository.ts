import { DeviceStatus } from '../constants/constants';
import { Mongo } from '../db/mongo';
import { Device } from '../db/mongo.interfaces';

export class DeviceRepository {
    public static findOne = (deviceId: string): Promise<Device | null> =>
        Mongo.device().findOne({ id: deviceId });

    public static updateStatus = (deviceId: string, status: DeviceStatus) =>
        Mongo.device().updateOne({ id: deviceId }, { $set: { status } });

    public static updateLastMovementDate = (
        deviceId: string,
        lastMovementDate: number
    ) =>
        Mongo.device().updateOne(
            { id: deviceId },
            { $set: { lastMovementDate } }
        );
}

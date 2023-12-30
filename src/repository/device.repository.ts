import { Mongo } from '../db/mongo';
import { Device } from '../db/mongo.interfaces';

export class DeviceRepository {
    public static findOne = (deviceId: string): Promise<Device | null> =>
        Mongo.device().findOne({ id: deviceId });
}

import { Db, MongoClient } from 'mongodb';
import { Event, Device } from './mongo.interfaces';
import { EVENT, DEVICE } from '../constants/db';

export class Mongo {
    private static mongo: Db;
    private static client: MongoClient;

    public static connect = (url: string): Promise<Db> =>
        MongoClient.connect(url)
            .then((c) => (this.client = c))
            .then((c) => (this.mongo = c.db()))
            .then((db) => db);

    public static close = () => this.client.close();
    public static device = () => Mongo.mongo.collection<Device>(DEVICE);
    public static event = () => Mongo.mongo.collection<Event>(EVENT);
}

import { Mongo } from '../db/mongo';
import { InternalEvent } from '../db/mongo.interfaces';

export class EventRepository {
    public static insertOne = (event: InternalEvent) =>
        Mongo.event().insertOne(event);
}

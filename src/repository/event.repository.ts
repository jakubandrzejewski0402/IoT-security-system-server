import { Mongo } from '../db/mongo';
import { Event } from '../db/mongo.interfaces';

export class EventRepository {
    public static insertOne = (event: Event) => Mongo.event().insertOne(event);
}

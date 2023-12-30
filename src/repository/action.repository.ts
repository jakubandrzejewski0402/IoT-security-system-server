import { Mongo } from '../db/mongo';
import { Action } from '../db/mongo.interfaces';

export class ActionRepository {
    public static insertOne = (action: Action) =>
        Mongo.action().insertOne(action);
}

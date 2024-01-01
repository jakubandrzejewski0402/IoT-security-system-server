import { Mongo } from '../db/mongo';
import { User } from '../db/mongo.interfaces';

export class UserRepository {
    public static findOne = (userId: string): Promise<User | null> =>
        Mongo.user().findOne({ id: userId });
}

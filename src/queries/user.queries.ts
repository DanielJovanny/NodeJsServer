import { UserModel } from '../models/user.model';

class userQueries {
    public async getUser(data) {
        try {
            const query = await UserModel.findAll();
            return { ok: true, data: query }
        } catch (e) {
            console.log(e);
            return { ok: false, data: null };
        }
    }
}

export const UserQueries = new userQueries();
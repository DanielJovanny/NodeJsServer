import { Response, Request } from "express";

import { UserQueries } from "../queries/user.queries";
import jwt from "jsonwebtoken";

class userController {

    public async getUsers(req: Request, res: Response) {

        const request = req.body;
        const users = await UserQueries.getUsers(request);
        if (users.ok) {
            return res.json({ data: users });

        } else {
            return res.status(400).json({ ok: false });

        }

    }

    public async logIn(req: Request, res: Response) {

        const request = req.body;
        if (request.user && request.password) {
            const userOne = await UserQueries.getOneUser(request);
            console.log(userOne.data);
            const token = jwt.sign({
                data: {
                    role: 'user',
                    user: userOne.data.name,
                    id_user:userOne.data.id_user
                }

            }, process.env.ENCRYPT_KEY);

            console.log(token)
            return res.json({ data: userOne, token: token });
        } else {
            return res.status(400).json({ ok: false });
        }


    }


}



export const UserController = new userController();
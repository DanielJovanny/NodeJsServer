import { Response, Request } from "express";

import { UserQueries } from "../queries/user.queries";

class userController{

    public async getUser(req:Request, res:Response){

        const request = req.body;
        const user = await UserQueries.getUser(request);
        if(user.ok){
            return res.json({data:user});

        }else{
            return res.status(400).json({ok:false});

        }

    }
}

export const UserController = new userController();
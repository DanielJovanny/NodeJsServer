import { UserModel } from '../models/user.model';
import { CountryModel } from '../models/country.model';


class userQueries {

    public async getOneUser(user) {
        try {
            const query = await UserModel.findOne({ where: { name: user.user } });
            if(query){
                return {ok: true, data: query}

            }else{  
                return {ok: false, data:null};

            }
        } catch (e) {
            return {ok:false, data: null};
        }


    }
    
    public async getUsers(data) {
        try {
            const query = await UserModel.findAll({
                logging: console.log,
                attributes: ['name','email'],
                include: [{
                    //where:{id_country:1},
                    model: CountryModel,
                    attributes: ['country_name'],
                    required: true,
                    as: 'Country'

                }]
            }
            );
            return { ok: true, data: query }
        } catch (e) {
            console.log(e);
            return { ok: false, data: null };
        }
    }
}

export const UserQueries = new userQueries();
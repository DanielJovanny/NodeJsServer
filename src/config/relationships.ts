/** Aquí importamos todos los modelos creado.
 * De igual forma, en este espacio vamos a declarar cada una de las llaves foreneas.
 *  import { ExampleModel } from '../models/example.model'
 */
import { UserModel } from "../models/user.model";
import { CountryModel } from "../models/country.model";
export default class Relationship {
    static init() {
        /**
         * Example.belongsTo(Foreign_Model_Name, { foreignKey: 'foreign_key_id', as: 'NameModel' })
         */
        UserModel.belongsTo(CountryModel, {foreignKey:'fk_country', as:'Country' }  );
    }
}
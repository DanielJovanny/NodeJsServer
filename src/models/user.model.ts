import { Model, DataTypes } from 'sequelize'
import { database } from '../config/database'

export class UserModel extends Model {
    /** Declaramos cada uno de los atributos del modelo */
    public id_user!: number;
    public name!: string;
    public email!: string;
    public age!: number;
}

/** Inicializamos el modelo a utilizar, debemos establecer cada una de las 
 * propiedades que creamos en la sección anterior.
 */
UserModel.init({
    // Example:
    id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    age:{
        type:DataTypes.INTEGER,
    },
}, {
    /** Aquí podemos agregar opciones adicionales. Por default. La librería 
     *  interpreta que todas las tablas de la base de datos contienen las columnas:
     *  createdAt y updatedAt. 
     *  En dado caso de que no se cuente con ellas, debemos agregar el siguiente 
     *  regla en este especio: timestamps: false
     */
    timestamps:false,
    sequelize: database,
    tableName: 'user'
})
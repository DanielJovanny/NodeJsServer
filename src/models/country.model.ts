import { Model, DataTypes } from 'sequelize'
import { database } from '../config/database'

export class CountryModel extends Model {
    /** Declaramos cada uno de los atributos del modelo */
    public id_country!: number;
    public country_code!: string;
    public country_name!: string;
    
}

/** Inicializamos el modelo a utilizar, debemos establecer cada una de las 
 * propiedades que creamos en la sección anterior.
 */
 CountryModel.init({
    // Example:
    id_country: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    country_code:{
        type:DataTypes.STRING,
    },
    country_name:{
        type:DataTypes.STRING,
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
    tableName: 'countries'
})
import { ExampleModel } from '../models/example.model'
import { Op } from 'sequelize'

export class CertificateQueries {
    /** Obtiene todos los recursos de la tabla */
    public async index() {
        try {
            let examples = await ExampleModel.findAll({})
            return { ok: true, examples }
        } catch{
            return { ok: false }
        }
    }

    /** Obtiene un solo resultado dependiendo del valor proporcionado */
    public async show(data) {
        try {
            let example = await ExampleModel.findOne({
                where: {
                    value: data.value
                }
            })
            return { ok: true, example }
        } catch{
            return { ok: false }
        }
    }

    /** Crea un nuevo registro */
    public async store(data) {
        try {
            let example = await ExampleModel.create({
                value: data.value
            })
            return { ok: true, example }
        } catch{
            return { ok: false }
        }
    }

    /** Actualiza un registro */
    public async update(data) {
        try {
            let example = await ExampleModel.update({
                value: data.value
            },
                { where: { value: data.value } }
            )
            return { ok: true, example }
        } catch {
            return { ok: false }
        }
    }

    /** Borra el registro proporcionado */
    public async destroy(data) {
        try {
            let example = await ExampleModel.destroy({
                where: { value: data.value }
            })
            return { ok: true, example }
        } catch {
            return { ok: false }
        }
    }
}

/* Si se necesita más información, favor de navegar al siguiente link: 
   https://sequelize.org/master/manual/model-querying-basics.html 
*/
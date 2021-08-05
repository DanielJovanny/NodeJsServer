import fs from 'fs'
import moment from 'moment'

export class File {
    public async upload(data, last_file, type) {
        /** Validamos y procesamos el archivo proporcionado */
        if (data.files == null) {
            return {
                ok: false,
                message: 'Favor de proporcionar un archivo a procesar'
            }
        }
        else if (!data.files.file) {
            return {
                ok: false,
                message: 'Si desea adjuntar un archivo pdf, es necesario proporcionar uno'
            }
        } else if (data.files.file == null) {
            return {
                ok: false,
                message: 'Favor de proporcionar un archivo a procesar'
            }
        }

        if (data.files.file['mimetype'] != 'application/pdf') {
            return {
                ok: false,
                message: 'Favor de proporcionar un archivo con extensión ".pdf"'
            }
        }

        let size: number = data.files.file['size'];
        let bytes: number = 1048576;
        let total_size: number = (size / bytes)

        if(total_size > 2.00) {
            return {
                ok: false,
                message: 'Favor de proporcionar un archivo menor o igual a 2 mb.'
            }
        }

        let file: any = data.files.file
        let nameFile: number = moment().unix()
        let path: string = (type == 'tipo_uno') ? process.env.FILE_PATH :  
            (type == 'tipo_dos') ? process.env.FILE_PATH : null

        if (last_file != null) {
            try {
                fs.unlinkSync(path + last_file);
            } catch (e) {
                console.log('Error files a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
                return {
                    ok: false,
                    message: 'Existen problemas al momento de eliminar el archivo anterior'
                }
            }
        }

        file.mv(path + nameFile + '.pdf', function (e) {
            if (e) {
                console.log('Error files a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
                return {
                    ok: false,
                    message: 'Existen problemas al momento de salvar el archivo'
                }
            }
        })

        return { ok: true, nameFile: nameFile + '.pdf' }
    }

    public async download(name, type) {

        let path: string = (type == 'documentacion') ? process.env.DOCUMENTATION_PATH : process.env.MESSAGE_DOCS_PATH
        
        try {
            return { ok: true, pdf: fs.readFileSync(path + name) }
        } catch(e) {
            console.log('Error files a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
            return { ok: false, message: 'Existen problemas al momento de obtener el pdf!' }
        }

    }

    public async destroy(name, type) {
        let path: string = (type == 'documentacion') ? process.env.DOCUMENTATION_PATH : null

        try {
            return { ok: true, pdf: fs.unlinkSync(path + name) }
        } catch(e) {
            console.log('Error files a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
            return { ok: false, message: 'Existen problemas al momento de eliminar el pdf!' }
        }
    }
}
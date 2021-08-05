/** Librería que nos permite acceder a recursos de otros servidores */
import axios from 'axios';
import moment from 'moment'
export class Axios {
    /** Obtenemos un array predefinido con las configuraciones y valores a enviar */
    getResponse = (data) => axios(data)
        .then(response => {
            return {
                ok: true,
                result: response.data
            }
        })
        .catch(e => {
            console.log('Error axios a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
            return {
                ok: false,
                result: 'Existe un problema al momento de conectarse con el servidor externo'
            }
        })
}
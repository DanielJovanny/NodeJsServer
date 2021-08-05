/** Library to do connections to others web services */
import { Axios } from './axios'

export class EvoPayment {
    /** Incoporamos librería para hacer peticiones a clientes */
    static Axios: Axios = new Axios()

    /** Funciónn que nos permite autentificarnos con EVO PAYMENTS */
    public async authenticate() {
        /** Creamos un objeto con los datos de autentiucación */
        let credentials = { 'user': process.env.EVO_USER, 'pass': process.env.EVO_PASS }
        /** Proporcionamos esos datos y hacemos la solicitud al cliente */
        let options = {
            method: 'POST',
            url: process.env.EVO_URL + 'access',
            headers: {
                'Content-Type': 'application/json'
            },
            data: credentials
        }

        let response = await EvoPayment.Axios.getResponse(options)

        if (response['ok'] == true) {
            return { ok: true, token: response.result.data.jwt }
        } else {
            return { ok: false, message: response.result }
        }
    }

    /** Función para realizar una transacción bancaria () */
    public async transaction(data) {
        /** Para poder hace una solicitud debemos proporcionar la siguiente arquitectura */
        let information = {
            'order': {
                'firstName': data.firstName,
                'lastName': data.lastName,
                'reference': data.reference,
                'amount': data.amount,
                'currency': data.currency,
                'detail': data.detail,
                'email': data.email
            },
            'userPlatform': data.userPlatform,
            'redirectUrl': process.env.EVO_REDIRECT_URL,
            'confirmationUrl': process.env.EVO_CONFIRMATION_URL
        }

        /** Proporcionamos esos datos y hacemos la solicitud al cliente */
        let options = {
            method: 'POST',
            url: process.env.EVO_URL + 'generate',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.token
            },
            data: information
        }

        /** Wait a response to Axios and validate the response */
        let response = await EvoPayment.Axios.getResponse(options)

        if (response['ok'] == true) {
            return { ok: true, link: response.result.data.transactionLink }
        } else {
            return { ok: false, message: response.result }
        }
    }

    /** Esta función procesa la información devuelta por el proveedor EVO PAYMENT (buscamos si existe 
     * un error de validación o del 3DS).
     *  Dicho cliente debe devolver cualquiera de estas respuestas:
     *  3DS o Validation se interpreta como un error al procesar el pago.
     *  3DS: Hubo un problema al pasar por el proceso 3D.
     *  Validación: la tarjeta proporcionada tiene datos incorrectos.
     */
    public async getEvoResponse(data) {
        /** Obtenemos la información proporcionada  */
        let information = (data.body['confirmation-response']) ? data.body['confirmation-response'] : null

        if (information == null) {
            return { ok: false, message: 'There is no information to process' }
        }

        let order: any;
        /** Validmaos si al momento de realizar la transacción existe un error, sino
         *  se supone que la transacción fue exitosa.
         */
        if (information.result_type == '3DS' || information.result_type == 'Validation') {
            order = information.info.reference
        } else {
            order = information.reference
        }

        if (information.result_type == 'Validation') {
            return {
                ok: false,
                order: order,
                result_type: 'Validation',
                order_system_id: information.info.order,
                message: information.message,
                order_status: 'REJECTED'
            }
        }

        if (information.result_type == '3DS') {
            return {
                ok: false,
                order: order,
                result_type: '3DS',
                order_system_id: information.info.order,
                message: 'There were problems going through the 3DS process',
                order_status: 'REJECTED'
            }
        }

        return { ok: true, order: order, data: information }
    }

    /** Función para obtener los datos deseados a procesar si la información ya fue
     *  procesada con la anterior información.
     */
    public async selectData(data) {
        if (data.result == 'SUCCESS') {
            /* Almacenamos datos obtenidos en la raíz del JSON */
            let merchant = data.merchant
            let order = data.order
            let response = data.response
            let result = data.result
            let sourceOfFunds = data.sourceOfFunds
            let transaction = data.transaction

            /* Alamcenamos datos obtenidos de la rama order */
            let order_system_id = order.id
            let total_authorized = order.totalAuthorizedAmount
            let currency = order.currency

            /* Alamcenamos datos obtenidos de la rama response */
            let acquirer_code = response.acquirerCode
            let order_status = response.gatewayCode

            /* Alamcenamos datos obtenidos de la rama sourceOfFunds */
            let brand = sourceOfFunds.provided.card.brand
            let frequency = sourceOfFunds.provided.card.fundingMethod
            let issuer = sourceOfFunds.provided.card.issuer
            let card = sourceOfFunds.provided.card.number

            /* Alamcenamos datos obtenidos de la rama transaction */
            let merchantId = transaction.acquirer.merchantId
            let authorization_code = transaction.authorizationCode
            let transaction_id = transaction.id
            let receipt = transaction.receipt
            let terminal = transaction.terminal

            /* Retornamos los valores que deseamos actualizar en la transación */

            return {
                result, order_system_id, order_status, total_authorized, currency,
                acquirer_code, message: 'Accept', brand, issuer, card, merchant, merchantId,
                authorization_code, frequency, transaction_id, receipt, terminal
            }
        } else {
            /* Almacenamos datos obtenidos en la raíz del JSON */
            let response = data.response
            let order = data.order
            let result = data.result
            let sourceOfFunds = data.sourceOfFunds

            /* Alamcenamos datos obtenidos de la rama order */
            let order_system_id = order.id

            /* Alamcenamos datos obtenidos de la rama response */
            let acquirer_code = response.acquirerCode

            /* Alamcenamos datos obtenidos de la rama sourceOfFunds */
            let brand = sourceOfFunds.provided.card.brand
            let frequency = sourceOfFunds.provided.card.fundingMethod
            let issuer = sourceOfFunds.provided.card.issuer
            let card = sourceOfFunds.provided.card.number

            return {
                result, order_system_id, acquirer_code, message: 'There were problems processing the card', brand, issuer,
                card, frequency
            }
        }
    }
}
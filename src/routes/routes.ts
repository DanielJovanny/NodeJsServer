import express from 'express'

/** Importamos todos los controladores disponibles */
import { ExampleController } from '../controllers/example.controller'

import{ UserController} from '../controllers/user.controller';

/** Importamos todos los middlewares disponibles: */
import { CheckHeaders } from '../middlewares/checkHeaders'

export class Routes {
    public exampleController: ExampleController = new ExampleController()

    public routes(app: express.Application): void {
        /** Adjuntamos el tipo de petición que debe mandar el cliente para acceder
         *  al recurso: GET, POST, PUT, ETC 
        */
        app.route('/api/example')
            .get(/*En esta parte agregamos los middlewares que sean necesarios, ejemplo: CheckHeaders.validateClientJWT*,*/ this.exampleController.users)
        app.route('/api/users')
            .get(CheckHeaders.test, this.exampleController.users)
        app.route('/api/user').post(UserController.getUser);
    }
}
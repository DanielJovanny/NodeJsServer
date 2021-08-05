/** Modulo que contiene las variables de desarrollo */
require('dotenv').config()
//require('dotenv').config({ path: '/root/envs/name_project/.env' })
/** Librerías que nos ayudaran a crear el servidor */
import express from 'express'
import https from 'https'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import fs from 'fs'
import fileUpload from 'express-fileupload'
import useragent from 'express-useragent'
import InitializationRelationship from './relationships'
import { Routes } from '../routes/routes'
import { Database } from './database'

class App {
  /** Inicializamos los componentes primarios que correrá el servidor */
  public app: express.Application
  public cors: express.RequestHandler
  public server: https.Server | http.Server
  public routes: Routes = new Routes()
  static database: Database = new Database()

  /** Ejecutamos las llaves primarias */
  constructor() {
    this.app = express()
    this.securityProtocol()
    this.config()
    this.database()
    this.routes.routes(this.app)
  }
  /** Creamos el motor principal del servidor */
  private config(): void {
    InitializationRelationship.init();
    this.app.use(cors())
    /***
     * "Helmet" nos ayuda a meter una capa de seguridad a las cabeceras HTTP, por medio de:
     * X-DNS-Prefetch-Control, X-Frame-Options, x-powered-by, 
     * Strict-Transport-Security,X-Download-Options, X-Content-Type-Options and
     * xssFilter
     */
    this.app.use(useragent.express())
    this.app.use(fileUpload())
    this.app.use(helmet())
    /** Agregamos "Cache-Control" para manipular la cache*/
    this.app.use(helmet.noCache())
    /** Denega el control de "X-Permitted-Cross-Domain-Policies" */
    this.app.use(helmet.permittedCrossDomainPolicies())
    /** Establecemos nuestras "Referrer Policy" */
    this.app.use(helmet.referrerPolicy({ policy: 'strict-origin' }))
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }
  /** Configuramos el protocolo http a utilizar (esta configurado bajo el 
   * tipo de desarrollo en que se este ejecutando) 
  */
  private securityProtocol(): void {
    if (process.env.MODE == 'dev') {
      this.server = http.createServer(this.app)
    } else {
      var privateKey = fs.readFileSync(process.env.PRIVATE_SSL, 'utf8')
      var certificate = fs.readFileSync(process.env.CERTIFICATE_SSL, 'utf8')
      var cabundle = fs.readFileSync(process.env.CABUNDLE_SSL, 'utf8')

      var credentials = { key: privateKey, cert: certificate, ca: cabundle }

      this.server = https.createServer(credentials, this.app)
    }
  }
  /** Valida si la conexión a la base de datos es correcta  */
  private async database() {
    let connection = await App.database.connection()
    console.log(connection.message)
  }
}
/** Exporta la configuración del servidor */
export default new App().server

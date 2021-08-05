/** Importamos las configuraciones deseadas */
import server from './config/app'

/** Obtenemos el puerto en donde se escucharan las peticiones del cliente */
const port = process.env.LISTEN_PORT

/** Activamos el servdor */
server.listen(port, () => console.log(`API is running. port: ${port}`))
# Plantilla base para desarrollo de proyectos con NodeJs y TypeScript

## Comenzando 🚀

_Modo desarrollo: Deberas descargar cada uno de los componentes de la plantilla._

_Modo producción: Es de carácter obligatorio que los siguientes archivos esten fuera del proyecto: .env, certificates, keys. Estos ficheros deberan estar referenciados en sus carpetas correspondientes (lease el archivo .env)._


### Pre-requisitos 📋

1- Instalar NodeJs.

2- Instalar Apache o NGINX.

3- Instalar Mysql.

4- Contar con un puerto asignado, ya que en el se basara el servidor.

5- Generar llaves publicas y privadas para hacer uso de ellas en el servidor (se recomienda instalar lo siguiente: https://slproweb.com/index.html).


### Instalación 🔧

1- Correr el siguiente comando:
```
npm install
```
2- Modificar el puerto para hacer uso de el (esto se ubica en el archivo .env y encobtrarás un valor llamado PORT).

3- Guardar las llaves publicas y privadas en la carpeta keys.

## Ejecutando las pruebas ⚙️

_Para poder testear cualquier ruta creada en el sistema, es necesario hacer la peticiones a la siguiente ruta:_

http://localhost:no_puerto/api

## Despliegue 📦

1- Descargar la rama "production".
2- Instalar las dependencias correspndientes con: 
```
npm install
```
3- Correr el siguiente comando en la raíz del proyecto (esto generará una carpeta llamada dist):
```
tsc -w
```
5- Incorporrar los archivos: .env, certificates y keys, en las carpetas correspondientes del servidor.
4- Cambiar el valor de MODE=DEV A MODE=PRODUCTION del archivo .env
5- Dirigirse al archivo app.js el cual se encontrará en dist/config y comentar la siguiente línea:
```
require('dotenv').config()
```
Una vez comentada, es necesario descomentar la siguiente líena: 
```
require('dotenv').config({ path: '/root/envs/nombre_de_proyecto/.env' })
```
5- Borrar la carpeta src (sudo rm -R src).

6- Probar que la aplicación este corriendo debidamente con nodemon (esta ya estará instalada en el servidor).

7- Matar el proceso de nodemon.

8- Agregar la API a la lista de forever (esto ocacionara que la app este en producción), el comando a utilizar será: 
```
forever start --uid "nombre_del_proyecto" --minUptime 1000 -e error.log -o out.log -a dist/server.js
```

9- En dado caso de necesitar abrir un puerto, favor de contactar al administrador.

## Construido con 🛠️

_A continuación se describen las librerías base a utilizar:_

* [axios](https://www.npmjs.com/package/axios) - Promesa basado en el cliente HTTP el cual nos ayudara a realizar peticones a otros servidores.
* [body-parser](https://www.npmjs.com/package/body-parser) - Facilita a parsear los datos que nos proporcione el cliente.
* [cors](https://www.npmjs.com/package/cors) -  Proporcionar un middleware Connect/Express que se puede usar para habilitar CORS con varias opciones.
* [@gc-sistemas/encrypt](https://github.com/GC-Sistemas/gs-encryption_node-library/packages) - Ayuda a encriptar datos con base al modelo definido por parte del departamento de sistemas.
* [dotenv](https://www.npmjs.com/package/body-parser) - Módulo de dependencia "cero" que carga variables de entorno desde un archivo .env.
* [express](https://www.npmjs.com/package/express) - Framework para nodejs.
* [express-fileupload](https://www.npmjs.com/package/express-fileupload) - Middleware simple que ayuda a cargar archivos.
* [express-useragent](https://www.npmjs.com/package/express-useragent) - Middleware de agente de usuario para NodeJS/ExpressJS que expone los detalles del agente de usuario a su aplicación y vistas.
* [helmet](https://www.npmjs.com/package/helmet) - Proteger a las aplicaciones basadas en Express, configurando varios encabezados HTTP.
* [jwt](https://www.npmjs.com/package/jsonwebtoken) - Servicio que brinda funciones para crea tokens de autenticación.
* [mathjs](https://www.npmjs.com/package/mathjs) - Facilita la operación de calculos.
* [mysql2](https://www.npmjs.com/package/mysql2) - Asistente que nos ayuda a trabajar con bases de datos MYSQL/MariaDB.
* [sequelize](https://www.npmjs.com/package/sequelize) - ORM que ayuda a manipular cualquier tipo de base de datos relacional.
* [socket.io](https://www.npmjs.com/package/socket.io) - Posibilita establecer conexiones en tiempo real entre el servidor y el cliente.
* [validator](https://www.npmjs.com/package/validator) - Valida datos proporcionados.


## Licencia 📄

Este proyecto está bajo la Licencia MIT

## Expresiones de Gratitud 🎁

* Invita una cerveza 🍺 o un café ☕.

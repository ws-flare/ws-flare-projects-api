import { WsFlareProjectApiApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { WsFlareProjectApiApplication };

const {MYSQL_HOST, MYSQL_PORT} = process.env;

export async function main(options: ApplicationConfig = {}) {

    options.mysqlHost = options.mysqlHost || MYSQL_HOST;
    options.mysqlPort = options.mysqlPort || MYSQL_PORT;

    const app = new WsFlareProjectApiApplication(options);
    await app.boot();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);

    return app;
}

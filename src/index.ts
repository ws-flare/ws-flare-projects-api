import { WsFlareProjectApiApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { WsFlareProjectApiApplication };

// Read MySQL data from environment variables
const {MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD} = process.env;

/**
 * Main entry point for starting the server
 * @param options
 */
export async function main(options: ApplicationConfig = {}) {

    options.mysqlHost = options.mysqlHost || MYSQL_HOST;
    options.mysqlPort = options.mysqlPort || MYSQL_PORT;
    options.mysqlUsername = options.mysqlUsername || MYSQL_USERNAME;
    options.mysqlPassword = options.mysqlPassword || MYSQL_PASSWORD;

    const app = new WsFlareProjectApiApplication(options);
    await app.boot();
    await app.migrateSchema();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);

    return app;
}

import { WsFlareProjectApiApplication } from '../..';
import { createRestAppClient, givenHttpServerConfig, Client } from '@loopback/testlab';
import * as mysql from 'mysql';
import { retry } from 'async';

let getRandomPort = require('random-port-as-promised');
let {Docker} = require('node-docker-api');

export async function setupApplication(): Promise<AppWithClient> {
    const config = givenHttpServerConfig();

    // Set host to `HOST` env var or ipv4 loopback interface
    // By default, docker container has ipv6 disabled.
    config.host = config.host || process.env.HOST || '127.0.0.1';

    // Set port to `PORT` env var or `0`
    config.port = config.port || +(process.env.PORT || 3000);

    const app = new WsFlareProjectApiApplication({
        rest: config,
    });

    await app.boot();
    await app.migrateSchema();
    await app.start();

    const client = createRestAppClient(app);

    return {app, client};
}

export interface AppWithClient {
    app: WsFlareProjectApiApplication;
    client: Client;
}

export async function startMysqlContainer(): Promise<{ container: any, port: string }> {
    const docker = new Docker({socketPath: '/var/run/docker.sock'});
    const port = await getRandomPort();

    console.log('PORT IS: ' + port);
    const container = await docker.container.create({
        Image: 'mysql:5',
        host: '127.0.0.1',
        port: port,
        Env: ['MYSQL_ROOT_PASSWORD=1', 'MYSQL_USER=test', 'MYSQL_PASSWORD=test', 'MYSQL_DATABASE=projects'],
        HostConfig: {
            PortBindings: {
                '3306/tcp': [
                    {
                        HostPort: `${port}`,
                    },
                ],
            },
        },
    });

    await container.start();

    await new Promise((resolve) => {
        retry({times: 20, interval: 2000}, done => {
            console.log('Trying to connect to mysql');
            const connection = mysql.createConnection({
                host: 'localhost',
                port: port,
                user: 'test',
                password: 'test',
                database: 'projects'
            });

            connection.connect();

            connection.query('SHOW TABLES', error => {
                done(error);
                connection.end();
            });

        }, () => resolve());
    });

    console.log('Mysql is up and running');

    return {container, port: `${port}`};
}

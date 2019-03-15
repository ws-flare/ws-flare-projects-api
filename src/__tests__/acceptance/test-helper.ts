import { WsFlareProjectApiApplication } from '../..';
import { createRestAppClient, givenHttpServerConfig, Client } from '@loopback/testlab';
import * as retry from 'async-retry';
import * as mysql from 'mysql';

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

    await retry(async () => {

        await new Promise(resolve => setTimeout(() => resolve(), 10000));

        console.log('Trying connection to mysql');
    }, {
        retries: 20,
    });

    console.log('Mysql is up and running');

    return {container, port: `${port}`};
}

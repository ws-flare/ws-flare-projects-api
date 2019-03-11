import { Client, expect } from '@loopback/testlab';
import { WsFlareProjectApiApplication } from '../..';
import { setupApplication, startMysqlContainer } from './test-helper';

describe('PingController', () => {
    let app: WsFlareProjectApiApplication;
    let client: Client;
    let container: any;
    let port: string;

    before('setupApplication', async () => {
        ({container, port} = await startMysqlContainer());

        process.env.MYSQL_PORT = port;

        ({app, client} = await setupApplication());
    });

    after(async () => {
        await app.stop();
        await container.stop();
    });

    it('invokes GET /ping', async () => {
        const res = await client.get('/ping?msg=world').expect(200);
        expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    });
});

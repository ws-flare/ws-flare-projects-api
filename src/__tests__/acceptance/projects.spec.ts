import {Client, expect} from '@loopback/testlab';
import {WsFlareProjectApiApplication} from '../..';
import {setupApplication} from './test-helper';

const {GenericContainer} = require("testcontainers");

describe('Projects', () => {
    let app: WsFlareProjectApiApplication;
    let client: Client;
    let container: any;

    before(async () => {
        container = await new GenericContainer("mysql")
            .withEnv("MYSQL_ROOT_PASSWORD", "my-secret-pw")
            .withExposedPorts(3306)
            .withStartupTimeout(120000)
            .start();

        ({app, client} = await setupApplication());
    });

    after(async () => {
        await app.stop();
        await container.stop();
    });

    it.only('should create a new project', async () => {
        const res = await client.post('/projects').send({userId: 'user1', name: 'project1'}).expect(200);
        expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
    });
});

import { Client, expect } from '@loopback/testlab';
import { WsFlareProjectApiApplication } from '../..';
import { setupApplication, startMysqlContainer } from './test-helper';

describe('Projects', () => {
    let app: WsFlareProjectApiApplication;
    let client: Client;
    let container: any;
    let port: string;

    before(async () => {
        ({container, port} = await startMysqlContainer());

        process.env.MYSQL_PORT = port;

        ({app, client} = await setupApplication());
    });

    after(async () => {
        await container.stop();
        await app.stop();
    });

    it('should create a new project', async () => {
        const res = await client.post('/projects').send({userId: 'user1', name: 'project1'}).expect(200);

        expect(res.body.id).not.null();
        expect(res.body.userId).to.eql('user1');
        expect(res.body.name).to.eql('project1');
    });
});

import { Client, expect } from '@loopback/testlab';
import { WsFlareProjectApiApplication } from '../..';
import { setupApplication, startMysqlContainer } from './test-helper';

describe('Tasks', () => {
    let app: WsFlareProjectApiApplication;
    let client: Client;
    let container: any;
    let port: number;

    before(async () => {
        ({container, port} = await startMysqlContainer());

        ({app, client} = await setupApplication(port));
    });

    after(async () => {
        await container.stop();
        await app.stop();
    });

    it('should create a new task', async () => {
        const res = await client.post('/tasks').send({
            userId: 'user1',
            name: 'test-name',
            uri: 'ws://localhost',
            projectId: 'abc123'
        }).expect(200);

        expect(res.body.id).not.null();
        expect(res.body.userId).to.eql('user1');
        expect(res.body.name).to.eql('test-name');
        expect(res.body.uri).to.eql('ws://localhost');
        expect(res.body.projectId).to.eql('abc123');
    });

});

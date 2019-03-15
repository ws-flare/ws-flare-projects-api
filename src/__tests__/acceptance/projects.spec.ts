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

    it('should get a list of projects', async () => {
        await client.post('/projects').send({userId: 'user1', name: 'project1'}).expect(200);
        await client.post('/projects').send({userId: 'user1', name: 'project2'}).expect(200);
        await client.post('/projects').send({userId: 'user1', name: 'project3'}).expect(200);

        const res = await client.get('/projects').expect(200);

        expect(res.body.length).to.be.greaterThan(2);
    });

    it('should get a single project by id', async () => {
        const project = await client.post('/projects').send({userId: 'user1', name: 'my-new-project'}).expect(200);

        const res = await client.get(`/projects/${project.body.id}`).expect(200);

        expect(res.body.name).to.equal('my-new-project');
        expect(res.body.userId).to.equal('user1');
    });
});

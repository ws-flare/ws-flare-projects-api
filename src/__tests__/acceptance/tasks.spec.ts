import {Client, expect} from '@loopback/testlab';
import {WsFlareProjectApiApplication} from '../..';
import {setupApplication, startMysqlContainer} from './test-helper';

/**
 * Tests for tasks related functionality
 */
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
            projectId: 'abc123',
            cfApi: 'http://cf.com',
            cfUser: 'user1',
            cfPass: 'pass1',
            cfOrg: 'org1',
            cfSpace: 'space1',
            cfApps: 'app1,app2,app3',
            successThreshold: 80,
            scripts: JSON.stringify([
                {
                    "start": 0,
                    "timeout": 60,
                    "totalSimulators": 1000,
                    "target": "wss://ws-flare-test-server.cfapps.io:4443",
                    "retryLimit": 10
                },
                {
                    "start": 30,
                    "timeout": 30,
                    "totalSimulators": 1000,
                    "target": "wss://ws-flare-test-server.cfapps.io:4443",
                    "retryLimit": 10
                },
                {
                    "start": 40,
                    "timeout": 30,
                    "totalSimulators": 1000,
                    "target": "wss://ws-flare-test-server.cfapps.io:4443",
                    "retryLimit": 10
                },
                {
                    "start": 0,
                    "timeout": 60,
                    "totalSimulators": 1000,
                    "target": "wss://ws-flare-test-server.cfapps.io:4443",
                    "retryLimit": 10
                },
                {
                    "start": 30,
                    "timeout": 30,
                    "totalSimulators": 1000,
                    "target": "wss://ws-flare-test-server.cfapps.io:4443",
                    "retryLimit": 10
                },
                {
                    "start": 40,
                    "timeout": 30,
                    "totalSimulators": 1000,
                    "target": "wss://ws-flare-test-server.cfapps.io:4443",
                    "retryLimit": 10
                }
            ])
        }).expect(200);

        expect(res.body.id).not.null();
        expect(res.body.userId).to.eql('user1');
        expect(res.body.name).to.eql('test-name');
        expect(res.body.projectId).to.eql('abc123');
        expect(res.body.cfApi).to.eql('http://cf.com');
        expect(res.body.cfUser).to.eql('user1');
        expect(res.body.cfPass).to.eql('pass1');
        expect(res.body.cfOrg).to.eql('org1');
        expect(res.body.cfSpace).to.eql('space1');
        expect(res.body.cfApps).to.eql('app1,app2,app3');
        expect(res.body.successThreshold).to.eql(80);
        expect(JSON.parse(res.body.scripts)).to.eql([
            {
                "start": 0,
                "timeout": 60,
                "totalSimulators": 1000,
                "target": "wss://ws-flare-test-server.cfapps.io:4443",
                "retryLimit": 10
            },
            {
                "start": 30,
                "timeout": 30,
                "totalSimulators": 1000,
                "target": "wss://ws-flare-test-server.cfapps.io:4443",
                "retryLimit": 10
            },
            {
                "start": 40,
                "timeout": 30,
                "totalSimulators": 1000,
                "target": "wss://ws-flare-test-server.cfapps.io:4443",
                "retryLimit": 10
            },
            {
                "start": 0,
                "timeout": 60,
                "totalSimulators": 1000,
                "target": "wss://ws-flare-test-server.cfapps.io:4443",
                "retryLimit": 10
            },
            {
                "start": 30,
                "timeout": 30,
                "totalSimulators": 1000,
                "target": "wss://ws-flare-test-server.cfapps.io:4443",
                "retryLimit": 10
            },
            {
                "start": 40,
                "timeout": 30,
                "totalSimulators": 1000,
                "target": "wss://ws-flare-test-server.cfapps.io:4443",
                "retryLimit": 10
            }
        ]);
    });

});

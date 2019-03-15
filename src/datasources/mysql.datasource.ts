import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { config } from './mysql.datasource-config';

export class MysqlDataSource extends juggler.DataSource {
    static dataSourceName = 'mysql';

    constructor(
        @inject('datasources.config.mysql', {optional: true})
            dsConfig: object = config,
        @inject('mysql.host')
        private host: string,
        @inject('mysql.port')
        private port: number
    ) {
        super({...dsConfig, host, port});
    }
}

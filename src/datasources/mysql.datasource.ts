import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { config } from './mysql.datasource-config';

export class MysqlDataSource extends juggler.DataSource {
    static dataSourceName = 'mysql';

    constructor(
        @inject('datasources.config.mysql', {optional: true})
            dsConfig: object = config,
    ) {
        super(dsConfig);
    }
}

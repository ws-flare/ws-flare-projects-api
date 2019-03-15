import { DefaultCrudRepository } from '@loopback/repository';
import { Task } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TaskRepository extends DefaultCrudRepository<Task,
    typeof Task.prototype.id> {
    constructor(
        @inject('datasources.mysql') dataSource: MysqlDataSource,
    ) {
        super(Task, dataSource);
    }
}

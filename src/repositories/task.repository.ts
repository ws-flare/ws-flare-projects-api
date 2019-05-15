import { DefaultCrudRepository } from '@loopback/repository';
import { Task } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

/**
 * Task repository for setting up MySQL tables for a task
 */
export class TaskRepository extends DefaultCrudRepository<Task,
    typeof Task.prototype.id> {
    constructor(
        @inject('datasources.mysql') dataSource: MysqlDataSource,
    ) {
        super(Task, dataSource);
    }
}

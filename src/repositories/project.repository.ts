import {DefaultCrudRepository} from '@loopback/repository';
import {Project} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

/**
 * Project repository for setting up MySQL tables for a project
 */
export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Project, dataSource);
  }
}

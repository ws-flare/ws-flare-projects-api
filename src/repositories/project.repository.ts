import {DefaultCrudRepository} from '@loopback/repository';
import {Project} from '../models';
import {CouchdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id
> {
  constructor(
    @inject('datasources.couchdb') dataSource: CouchdbDataSource,
  ) {
    super(Project, dataSource);
  }
}

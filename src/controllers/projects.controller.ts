import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import { Project } from '../models';
import { ProjectRepository } from '../repositories';

/**
 * Controller for /projects endpoints
 */
export class ProjectsController {
    constructor(
        @repository(ProjectRepository)
        public projectRepository: ProjectRepository,
    ) {
    }

    /**
     * Creates a new project
     * @param project - new project
     */
    @post('/projects', {
        responses: {
            '200': {
                description: 'Project model instance',
                content: {'application/json': {schema: {'x-ts-type': Project}}},
            },
        },
    })
    async create(@requestBody() project: Project): Promise<Project> {
        return await this.projectRepository.create(project);
    }

    /**
     * Counts filtered projects
     * @param where - Filter to use
     */
    @get('/projects/count', {
        responses: {
            '200': {
                description: 'Project model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Project)) where?: Where,
    ): Promise<Count> {
        return await this.projectRepository.count(where);
    }

    /**
     * Gets a filterable list of projects
     * @param filter - Filter to apply
     */
    @get('/projects', {
        responses: {
            '200': {
                description: 'Array of Project model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': Project}},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Project)) filter?: Filter,
    ): Promise<Project[]> {
        return await this.projectRepository.find(filter);
    }

    /**
     * Updates the project using a given filter
     * @param project - The project to update
     * @param where - The filter to apply
     */
    @patch('/projects', {
        responses: {
            '200': {
                description: 'Project PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody() project: Project,
        @param.query.object('where', getWhereSchemaFor(Project)) where?: Where,
    ): Promise<Count> {
        return await this.projectRepository.updateAll(project, where);
    }

    /**
     * Find a project by id
     * @param id - project id
     */
    @get('/projects/{id}', {
        responses: {
            '200': {
                description: 'Project model instance',
                content: {'application/json': {schema: {'x-ts-type': Project}}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<Project> {
        return await this.projectRepository.findById(id);
    }

    /**
     * Update a project by id
     * @param id - The project id
     * @param project - The project
     */
    @patch('/projects/{id}', {
        responses: {
            '204': {
                description: 'Project PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody() project: Project,
    ): Promise<void> {
        await this.projectRepository.updateById(id, project);
    }

    /**
     * Updates a project by id
     * @param id - project id
     * @param project - The project
     */
    @put('/projects/{id}', {
        responses: {
            '204': {
                description: 'Project PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() project: Project,
    ): Promise<void> {
        await this.projectRepository.replaceById(id, project);
    }

    /**
     * Deletes a project by id
     * @param id - project id
     */
    @del('/projects/{id}', {
        responses: {
            '204': {
                description: 'Project DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.projectRepository.deleteById(id);
    }
}

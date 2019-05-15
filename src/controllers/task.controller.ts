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
import { Task } from '../models';
import { TaskRepository } from '../repositories';

/**
 * Controller for /tasks endpoints
 */
export class TaskController {
    constructor(
        @repository(TaskRepository)
        public taskRepository: TaskRepository,
    ) {
    }

    /**
     * Create a new task
     * @param task - The task to create
     */
    @post('/tasks', {
        responses: {
            '200': {
                description: 'Task model instance',
                content: {'application/json': {schema: {'x-ts-type': Task}}},
            },
        },
    })
    async create(@requestBody() task: Task): Promise<Task> {
        return await this.taskRepository.create(task);
    }

    /**
     * Count all the tasks in the database by a given filter
     * @param where - The filter to apply
     */
    @get('/tasks/count', {
        responses: {
            '200': {
                description: 'Task model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Task)) where?: Where,
    ): Promise<Count> {
        return await this.taskRepository.count(where);
    }

    /**
     * Gets a list of tasks by filter
     * @param filter - The filter to apply
     */
    @get('/tasks', {
        responses: {
            '200': {
                description: 'Array of Task model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': Task}},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Task)) filter?: Filter,
    ): Promise<Task[]> {
        return await this.taskRepository.find(filter);
    }

    /**
     * Update a task object
     * @param task - The task
     * @param where - Filter to apply
     */
    @patch('/tasks', {
        responses: {
            '200': {
                description: 'Task PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody() task: Task,
        @param.query.object('where', getWhereSchemaFor(Task)) where?: Where,
    ): Promise<Count> {
        return await this.taskRepository.updateAll(task, where);
    }

    /**
     * Get a task by id
     * @param id - Task ID
     */
    @get('/tasks/{id}', {
        responses: {
            '200': {
                description: 'Task model instance',
                content: {'application/json': {schema: {'x-ts-type': Task}}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<Task> {
        return await this.taskRepository.findById(id);
    }

    /**
     * Update a task by id
     * @param id - The task ID
     * @param task - The task
     */
    @patch('/tasks/{id}', {
        responses: {
            '204': {
                description: 'Task PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody() task: Task,
    ): Promise<void> {
        await this.taskRepository.updateById(id, task);
    }

    /**
     * Replace a task by id
     * @param id - The task id
     * @param task - The task
     */
    @put('/tasks/{id}', {
        responses: {
            '204': {
                description: 'Task PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() task: Task,
    ): Promise<void> {
        await this.taskRepository.replaceById(id, task);
    }

    /**
     * Deletes a task by id
     * @param id - The task id
     */
    @del('/tasks/{id}', {
        responses: {
            '204': {
                description: 'Task DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.taskRepository.deleteById(id);
    }
}

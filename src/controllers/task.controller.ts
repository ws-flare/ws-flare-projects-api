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
import {Task} from '../models';
import {TaskRepository} from '../repositories';

export class TaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
  ) {}

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

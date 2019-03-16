import { Entity, model, property } from '@loopback/repository';
import * as uuid from 'uuid/v4';

@model()
export class Task extends Entity {
    @property({
        type: 'string',
        id: true,
        default: () => uuid()
    })
    id: string;

    @property({
        type: 'string',
        required: true,
    })
    userId: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
    uri: string;

    @property({
        type: 'string',
        required: true,
    })
    projectId: string;

    @property({
        type: 'number',
        required: true,
    })
    totalSimulatedUsers: number;

    constructor(data?: Partial<Task>) {
        super(data);
    }
}

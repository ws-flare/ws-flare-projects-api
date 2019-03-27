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
        required: true
    })
    userId: string;

    @property({
        type: 'string',
        required: true
    })
    name: string;

    @property({
        type: 'string',
        required: true
    })
    uri: string;

    @property({
        type: 'string',
        required: true
    })
    projectId: string;

    @property({
        type: 'number',
        required: true
    })
    totalSimulatedUsers: number;

    @property({
        type: 'number',
        required: true
    })
    runTime: number;

    @property({
        type: 'string',
        required: true
    })
    cfApi: string;

    @property({
        type: 'string',
        required: true
    })
    cfUser: string;

    @property({
        type: 'string',
        required: true
    })
    cfPass: string;

    @property({
        type: 'string',
        required: true
    })
    cfOrg: string;

    @property({
        type: 'string',
        required: true
    })
    cfSpace: string;

    @property({
        type: 'string',
        required: true
    })
    cfApps: string;

    constructor(data?: Partial<Task>) {
        super(data);
    }
}

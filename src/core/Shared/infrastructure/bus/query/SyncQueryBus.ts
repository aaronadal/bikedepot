import { HandlerNotFoundError } from '@core/Shared/domain/bus/error/HandlerNotFoundError';
import { Query } from '@core/Shared/domain/bus/query/Query';
import { QueryBus } from '@core/Shared/domain/bus/query/QueryBus';
import { QueryHandler } from '@core/Shared/domain/bus/query/QueryHandler';
import { injectAll, singleton } from 'tsyringe';

@singleton()
export class SyncQueryBus implements QueryBus {
    private readonly handlersMap: Map<Function, QueryHandler<Query<unknown>, unknown>>

    constructor(
        @injectAll('QueryHandler') handlers: QueryHandler<Query<unknown>, unknown>[]
    ) {
        this.handlersMap = new Map()

        handlers.forEach((handler) => this.handlersMap.set(handler.supports(), handler))
    }

    async ask<T>(query: Query<T>): Promise<T> {
        const handler = this.handlersMap.get(query.constructor);
        if(!handler) {
            throw HandlerNotFoundError.byMessage(query)
        }

        return await handler.handle(query) as Promise<T>;
    }
}

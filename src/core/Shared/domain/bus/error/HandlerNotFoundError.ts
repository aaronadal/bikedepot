import { Command } from "../command/Command";
import { Event } from "../event/Event";
import { Query } from "../query/Query";
import {DomainError} from "@core/Shared/domain/error/DomainError";

export class HandlerNotFoundError extends DomainError {
    public static byMessage(message: Command|Event|Query<unknown>): HandlerNotFoundError {
        return new HandlerNotFoundError(`No handler found for <${message.constructor.name}>`)
    }
  
    constructor(message: string) {
        super(500, message, 'HandlerNotFoundError');
    }
}

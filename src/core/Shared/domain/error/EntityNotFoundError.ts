import {DomainError} from "@core/Shared/domain/error/DomainError";

export class EntityNotFoundError extends DomainError {
  public static byTypeAndId(type: string, id: string): EntityNotFoundError {
      return new EntityNotFoundError(`No <${type}> found with ID <${id}>`)
  }

  constructor(message: string) {
    super(404, message, 'EntityNotFoundError');
  }
}

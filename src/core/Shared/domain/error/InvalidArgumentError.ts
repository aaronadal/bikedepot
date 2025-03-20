import {DomainError} from "@core/Shared/domain/error/DomainError";

export class InvalidArgumentError extends DomainError {
  constructor(message: string) {
    super(400, message, 'InvalidArgumentError');
  }
}

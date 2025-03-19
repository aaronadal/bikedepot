export class EntityNotFoundError extends Error {
  public static byTypeAndId(type: string, id: string): EntityNotFoundError {
      return new EntityNotFoundError(`No <${type}> found with ID <${id}>`)
  }

  constructor(message: string) {
    super(message);
    this.name = 'EntityNotFoundError';
  }
}

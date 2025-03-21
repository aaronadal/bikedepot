export abstract class DomainError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    name: string,
  ) {
    super(message);
    this.name = name;
  }
}

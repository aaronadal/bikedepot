import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { singleton } from "tsyringe";

@singleton()
export class DynamoDbManager<T extends Record<string, any>> {
  readonly client: DynamoDBDocumentClient;

  constructor(config: any) {
    this.client = new DynamoDBClient(config);
  }

  async save(table: string, item: T): Promise<void> {
    await this.client.send(
      new PutCommand({
        TableName: table,
        Item: item,
      }),
    );
  }

  async delete(table: string, id: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: table,
        Key: { id },
      }),
    );
  }

  async search(table: string, id: string): Promise<T | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: table,
        Key: { id },
      }),
    );

    return (result.Item || null) as T | null;
  }

  async all(
    table: string,
    condition: [string, string],
    index?: string,
    order?: "asc" | "desc",
  ) {
    const result = await this.client.send(
      new QueryCommand({
        TableName: table,
        IndexName: index,
        KeyConditionExpression: `${condition[0]} = :c`,
        ExpressionAttributeValues: { ":c": condition[1] },
        ScanIndexForward: order !== "desc",
      }),
    );

    return result.Items as T[];
  }
}

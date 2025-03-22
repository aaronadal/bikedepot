import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APP_CONFIG } from "@apps/shop/config";

import customerDefinition from "@core/Shop/Customer/infrastructure/persistence/dynamo.customer.definition.json";

const dynamoClient = new DynamoDBClient(APP_CONFIG.dynamoDb.config);

async function createTables(definitions: Record<string, any>): Promise<void> {
  const keys = Object.keys(definitions);

  for (const key of keys) {
    try {
      console.log(`Creating ${key} table... `);

      const definition = { ...definitions[key], TableName: key };
      await dynamoClient.send(new CreateTableCommand(definition));

      console.log("Table created successfully");
    } catch (error) {
      console.error("Error creating table:", `${error}`);
    }
  }
}

createTables({
  [APP_CONFIG.dynamoDb.customersTableName]: customerDefinition,
});

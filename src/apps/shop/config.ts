import { config } from "dotenv";

const stage = process.env.SLS_STAGE || "development";
const env = process.env.NODE_ENV || stage;

const root = `${__dirname}/../../..`;
config({
  path: [
    `${root}/.env`,
    `${root}/.env.local`,
    `${root}/.env.${env}`,
    `${root}/.env.${env}.local`,
  ],
});

const region = process.env.SHOP_APP_AWS_REGION || "localhost";

function dynamoDbConfig(env: string, region: string) {
  if (env !== "development") {
    return {
      region,
    };
  }

  return {
    region: region,
    endpoint: process.env.DYNAMODB_ENDPOINT || "",
    credentials: {
      accessKeyId: "dev",
      secretAccessKey: "dev",
    },
  };
}

export const APP_CONFIG = {
  env,
  port: Number(process.env.SHOP_APP_PORT || 3000),
  dynamoDb: {
    config: dynamoDbConfig(env, region),
    customersTableName: `${process.env.SHOP_CUSTOMERS_TABLE}-${stage}`,
  },
};

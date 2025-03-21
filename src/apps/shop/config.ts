import { config } from "dotenv";

config();

function dynamoDbConfig() {
  return {
    region: "localhost",
    endpoint: "http://localhost:8000",
    credentials: {
      accessKeyId: "dev",
      secretAccessKey: "dev",
    },
  };
}

export const APP_CONFIG = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.SHOP_APP_PORT || 3000),
  dynamoDb: {
    config: dynamoDbConfig(),
  },
};

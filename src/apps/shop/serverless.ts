import { handle } from "hono/aws-lambda";
import { app } from "@apps/shop/app";

export const handler = handle(app);

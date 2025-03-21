import "reflect-metadata";
import "./container";
import { DomainError } from "@core/Shared/domain/error/DomainError";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { register as registerRoutes } from "./routes";
import { APP_CONFIG } from "@apps/shop/config";
import { prettyJSON } from "hono/pretty-json";

function initApp() {
  const app = new Hono();
  app.use(cors());

  if (APP_CONFIG.env === "development") {
    app.use(prettyJSON({ space: 4 }));
  }

  registerRoutes(app);

  app.onError((err) => {
    if (err instanceof DomainError) {
      err = new HTTPException(err.statusCode as ContentfulStatusCode, {
        message: err.message,
        cause: err,
      });
    } else if (!(err instanceof HTTPException)) {
      err = new HTTPException(500, {
        message: err.message,
        cause: err,
      });
    }

    return (err as HTTPException).getResponse();
  });

  return app;
}

export const app = initApp();

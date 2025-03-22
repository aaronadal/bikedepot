import {CommandBus} from "@core/Shared/domain/bus/command/CommandBus";
import {EventBus} from "@core/Shared/domain/bus/event/EventBus";
import {QueryBus} from "@core/Shared/domain/bus/query/QueryBus";
import {SyncCommandBus} from "@core/Shared/infrastructure/bus/command/SyncCommandBus";
import {NoopEventBus} from "@core/Shared/infrastructure/bus/event/NoopEventBus";
import {SyncQueryBus} from "@core/Shared/infrastructure/bus/query/SyncQueryBus";
import {container, Lifecycle} from "tsyringe";
import {APP_CONFIG} from "@apps/shop/config";
import {TestEventBus} from "@core/Shared/infrastructure/bus/event/TestEventBus";

container.register<CommandBus>(
  "CommandBus",
  { useClass: SyncCommandBus },
  { lifecycle: Lifecycle.Singleton },
);
container.register<QueryBus>(
  "QueryBus",
  { useClass: SyncQueryBus },
  { lifecycle: Lifecycle.Singleton },
);

if (APP_CONFIG.env === "test") {
  container.register<EventBus>(
    "EventBus",
    { useClass: TestEventBus },
    { lifecycle: Lifecycle.Singleton },
  );
} else {
  container.register<EventBus>(
    "EventBus",
    { useClass: NoopEventBus },
    { lifecycle: Lifecycle.Singleton },
  );
}

container.register('DynamoDBConnectionConfig', { useValue: APP_CONFIG.dynamoDb.config });

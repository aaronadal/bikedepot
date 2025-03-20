import {serve} from '@hono/node-server';
import {APP_CONFIG} from "@apps/shop/config";
import {app} from "@apps/shop/app";


console.log(`Server running on port ${APP_CONFIG.port}`);

serve({
    fetch: app.fetch,
    port: APP_CONFIG.port,
});

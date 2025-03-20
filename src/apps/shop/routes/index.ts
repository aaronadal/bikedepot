import { Hono } from 'hono';

import { register as registerCustomer } from './customer.routes'

export function register(app: Hono): void {
    // Health check route
    app.get('/', (c) => c.json({ ready: true }));

    registerCustomer(app);
}

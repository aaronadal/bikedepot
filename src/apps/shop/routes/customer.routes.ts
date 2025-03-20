import { container } from 'tsyringe';
import { Hono } from 'hono';
import { ListController } from '../controller/Customer/list.controller';
import {CreateController} from "@apps/shop/controller/Customer/create.controller";
import {UpdateController} from "@apps/shop/controller/Customer/update.controller";
import {DeleteController} from "@apps/shop/controller/Customer/delete.controller";
import {GetController} from "@apps/shop/controller/Customer/get.controller";
import {SetCreditController} from "@apps/shop/controller/Customer/setCredit.controller";

export function register(app: Hono): void {
    app.get('/customers', async (c) => await container.resolve(ListController).invoke(c));
    app.post('/customers', async (c) => await container.resolve(CreateController).invoke(c));
    app.get('/customers/:id', async (c) => await container.resolve(GetController).invoke(c));
    app.put('/customers/:id', async (c) => await container.resolve(UpdateController).invoke(c));
    app.delete('/customers/:id', async (c) => await container.resolve(DeleteController).invoke(c));

    app.put('/customers-credit/:id', async (c) => await container.resolve(SetCreditController).invoke(c));
}

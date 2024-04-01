import { Application } from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { IdentityService } from './src/services/itentity.service';

export default (app: Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC"
    });

    container.register({
        identityService: asClass(IdentityService).scoped()
    });

    app.use(scopePerRequest(container));
}
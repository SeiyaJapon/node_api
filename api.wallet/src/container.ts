import express = require('express');
import { createContainer, asClass } from "awilix";
import {scopePerRequest } from 'awilix-express';
import {TestService} from "./services/test.service";
import {SubscriptionMysqlRepository} from "./services/repositories/impl/mysql/subscription.repository";
import {SubscriptionService} from "./services/subscription.service";
import {MovementMySQLRepository} from "./services/repositories/impl/mysql/movement.repository";
import {BalanceMySQLRepository} from "./services/repositories/impl/mysql/balance.repository";
import {MovementService} from "./services/movement.service";

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        // Repositories
        subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),

        // Services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};
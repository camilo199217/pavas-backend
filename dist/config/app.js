"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routingControllersOptions = void 0;
exports.routingControllersOptions = {
    routePrefix: '/api',
    controllers: [__dirname + '/../controllers/*.controller.{ts,js}'],
    validation: true,
};

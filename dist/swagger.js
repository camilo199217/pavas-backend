"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenAPISpec = void 0;
// src/swagger.ts
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_1 = require("./config/app");
const getOpenAPISpec = () => {
    const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)((0, routing_controllers_1.getMetadataArgsStorage)(), app_1.routingControllersOptions, {
        components: {},
        info: {
            title: 'Pavas API',
            version: '1.0.0',
        },
    });
    return spec;
};
exports.getOpenAPISpec = getOpenAPISpec;

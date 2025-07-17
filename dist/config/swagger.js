"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
function setupSwagger(app) {
    const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
    const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, {
        controllers: [__dirname + '/../controllers/*.controller.{ts,js}'], // Agrega aquí todos tus controladores
    }, {
        info: {
            title: 'Pavas API',
            version: '1.0.0',
            description: 'Documentación de la API de Pavas',
        },
    });
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
}

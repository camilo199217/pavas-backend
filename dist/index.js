"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const data_source_1 = require("./data-source");
const dotenv = __importStar(require("dotenv"));
const app_1 = require("./config/app");
const swagger_1 = require("./config/swagger");
dotenv.config();
const app = (0, express_1.default)();
(0, routing_controllers_1.useExpressServer)(app, app_1.routingControllersOptions);
// Swagger setup
(0, swagger_1.setupSwagger)(app);
data_source_1.AppDataSource.initialize()
    .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        console.log(`📚 Swagger disponible en http://localhost:${port}/docs`);
    });
})
    .catch((err) => {
    console.error('Error al conectar la base de datos:', err);
});

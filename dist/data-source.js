"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: config_1.default.DB_HOST,
    port: config_1.default.DB_PORT,
    username: config_1.default.DB_USERNAME,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.entity.ts'],
});

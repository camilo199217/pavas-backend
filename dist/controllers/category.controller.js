"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const routing_controllers_1 = require("routing-controllers");
const data_source_1 = require("../data-source");
const category_entity_1 = require("../entities/category.entity");
const create_category_dto_1 = require("../dtos/create-category.dto");
const typeorm_1 = require("typeorm");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
let CategoryController = class CategoryController {
    constructor() {
        this.categoryRepo = data_source_1.AppDataSource.getRepository(category_entity_1.Category);
    }
    getAll() {
        return this.categoryRepo.find({ relations: ['products'] });
    }
    getOne(id) {
        return this.categoryRepo.findOne({ where: { id }, relations: ['products'] });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.categoryRepo.create(body);
            try {
                return yield this.categoryRepo.save(category);
            }
            catch (error) {
                if (error instanceof typeorm_1.QueryFailedError && error.code === 'ER_DUP_ENTRY') {
                    throw new routing_controllers_1.BadRequestError(`Category '${body.name}' already exists.`);
                }
                throw error;
            }
        });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.HttpCode)(200),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Obtener categoría por ID',
        responses: {
            200: {
                description: 'Categoría encontrada',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Category' },
                    },
                },
            },
            404: {
                description: 'Categoría no encontrada',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                    },
                },
            },
        },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(category_entity_1.Category),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Crear nueva categoría',
        responses: {
            201: {
                description: 'Categoría creada exitosamente',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Category' },
                    },
                },
            },
            400: {
                description: 'Solicitud inválida',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                    },
                },
            },
        },
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                example: 'Electrónica',
                                description: 'Nombre de la categoría. Debe ser único.',
                            },
                        },
                        required: ['name'],
                    },
                },
            },
        },
    }),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
exports.CategoryController = CategoryController = __decorate([
    (0, routing_controllers_1.JsonController)('/categories')
], CategoryController);

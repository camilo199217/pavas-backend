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
exports.ProductController = void 0;
const routing_controllers_1 = require("routing-controllers");
const product_entity_1 = require("src/entities/product.entity");
const category_entity_1 = require("src/entities/category.entity");
const data_source_1 = require("src/data-source");
let ProductController = class ProductController {
    constructor() {
        this.productRepo = data_source_1.AppDataSource.getRepository(product_entity_1.Product);
        this.categoryRepo = data_source_1.AppDataSource.getRepository(category_entity_1.Category);
    }
    getAll() {
        return this.productRepo.find({ relations: ['categories'] });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepo.findOne({
                where: { id },
                relations: ['categories'],
            });
            if (!product)
                throw new routing_controllers_1.NotFoundError('Product not found');
            return product;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const categories = ((_a = body.categoryIds) === null || _a === void 0 ? void 0 : _a.length)
                ? yield this.categoryRepo.findByIds(body.categoryIds)
                : [];
            const product = this.productRepo.create({
                name: body.name,
                description: body.description,
                categories,
            });
            return yield this.productRepo.save(product);
        });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
exports.ProductController = ProductController = __decorate([
    (0, routing_controllers_1.JsonController)('/products')
], ProductController);

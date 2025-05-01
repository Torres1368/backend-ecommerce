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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddressController = void 0;
const common_1 = require("@nestjs/common");
const shipping_address_service_1 = require("./shipping-address.service");
const create_shipping_address_dto_1 = require("./dto/create-shipping-address.dto");
const update_shipping_address_dto_1 = require("./dto/update-shipping-address.dto");
const swagger_1 = require("@nestjs/swagger");
let ShippingAddressController = class ShippingAddressController {
    shippingAddressService;
    constructor(shippingAddressService) {
        this.shippingAddressService = shippingAddressService;
    }
    create(createShippingAddressDto) {
        return this.shippingAddressService.create(createShippingAddressDto);
    }
    findAll() {
        return this.shippingAddressService.findAll();
    }
    findOne(id) {
        return this.shippingAddressService.findOne(id);
    }
    update(id, updateShippingAddressDto) {
        return this.shippingAddressService.update(id, updateShippingAddressDto);
    }
    remove(id) {
        return this.shippingAddressService.remove(id);
    }
};
exports.ShippingAddressController = ShippingAddressController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear direccion de envio' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Direccion de envio creada correctamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipping_address_dto_1.CreateShippingAddressDto]),
    __metadata("design:returntype", void 0)
], ShippingAddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos las direcciones de envio' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retornar todos las direcciones de envio de los usuarios' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingAddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una direccion de envio por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID de la direccion de envio' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Direccion de envio encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Direccion de envio no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingAddressController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una direccion de envio por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID de direccion de envio a actualizar' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Direccion de envio actualizada correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Direccion de envio no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipping_address_dto_1.UpdateShippingAddressDto]),
    __metadata("design:returntype", void 0)
], ShippingAddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una direccion de envio por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID de la direccion de envio a eliminar' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Direccion de envio eliminada correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Direccion de envio no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingAddressController.prototype, "remove", null);
exports.ShippingAddressController = ShippingAddressController = __decorate([
    (0, swagger_1.ApiTags)('Direccion envio'),
    (0, common_1.Controller)('shipping-address'),
    __metadata("design:paramtypes", [shipping_address_service_1.ShippingAddressService])
], ShippingAddressController);
//# sourceMappingURL=shipping-address.controller.js.map
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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const swagger_1 = require("@nestjs/swagger");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create(createPaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }
    findAll() {
        return this.paymentService.findAll();
    }
    findOne(id) {
        return this.paymentService.findOne(id);
    }
    update(id, updatePaymentDto) {
        return this.paymentService.update(id, updatePaymentDto);
    }
    remove(id) {
        return this.paymentService.remove(id);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un pago' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pago creado correctamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los pagos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retornar todos los pagos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un pago por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID del pago' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pago encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pago no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un pago por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID del pago a actualizar' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pago actualizado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pago no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un pago por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID del pago a eliminar' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Pago eliminado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pago no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "remove", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('pagos'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map
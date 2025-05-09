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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = exports.EstadoPedido = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var EstadoPedido;
(function (EstadoPedido) {
    EstadoPedido["PENDIENTE"] = "PENDIENTE";
    EstadoPedido["PROCESANDO"] = "PROCESANDO";
    EstadoPedido["ENVIADO"] = "ENVIADO";
    EstadoPedido["ENTREGADO"] = "ENTREGADO";
    EstadoPedido["CANCELADO"] = "CANCELADO";
})(EstadoPedido || (exports.EstadoPedido = EstadoPedido = {}));
class PedidoProductoDto {
    productoId;
    cantidad;
    precioUnitario;
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PedidoProductoDto.prototype, "productoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PedidoProductoDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PedidoProductoDto.prototype, "precioUnitario", void 0);
class CreateOrderDto {
    usuarioId;
    estado;
    total;
    direccion;
    productos;
    pagoId;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EstadoPedido),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "direccion", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PedidoProductoDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "productos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "pagoId", void 0);
//# sourceMappingURL=create-order.dto.js.map
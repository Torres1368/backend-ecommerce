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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        const { productos, pagoId, ...pedidoData } = createOrderDto;
        const total = productos.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);
        const pedido = await this.prisma.pedido.create({
            data: {
                ...pedidoData,
                total,
                pago: pagoId ? { connect: { id: pagoId } } : undefined,
                productos: {
                    create: productos.map((p) => ({
                        producto: { connect: { id: p.productoId } },
                        cantidad: p.cantidad,
                        precioUnitario: p.precioUnitario,
                    })),
                },
            },
            include: {
                productos: true,
            },
        });
        return pedido;
    }
    async findAll() {
        return this.prisma.pedido.findMany({
            include: {
                productos: true,
                pago: true,
                usuario: true,
            },
        });
    }
    async findOne(id) {
        const pedido = await this.prisma.pedido.findUnique({
            where: { id },
            include: {
                productos: true,
                pago: true,
                usuario: true,
            },
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        return pedido;
    }
    async update(id, updateOrderDto) {
        const pedidoExistente = await this.prisma.pedido.findUnique({ where: { id } });
        if (!pedidoExistente) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        const dataToUpdate = Object.fromEntries(Object.entries(updateOrderDto).filter(([_, value]) => value !== undefined));
        const pedidoActualizado = await this.prisma.pedido.update({
            where: { id },
            data: dataToUpdate,
        });
        return pedidoActualizado;
    }
    async remove(id) {
        const pedido = await this.prisma.pedido.findUnique({
            where: { id },
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        return this.prisma.pedido.delete({
            where: { id },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
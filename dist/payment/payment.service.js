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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaymentDto) {
        return this.prisma.pago.create({
            data: createPaymentDto,
        });
    }
    async findAll() {
        return this.prisma.pago.findMany();
    }
    async findOne(id) {
        const paymentFound = await this.prisma.pago.findUnique({
            where: {
                id: id,
            },
        });
        if (!paymentFound) {
            throw new common_1.NotFoundException('Pago no encontrado');
        }
        return paymentFound;
    }
    async update(id, updatePaymentDto) {
        const paymentFound = await this.prisma.pago.findUnique({
            where: {
                id: id,
            },
        });
        if (!paymentFound) {
            throw new common_1.NotFoundException('Pago no encontrado');
        }
        const dataToUpdate = Object.fromEntries(Object.entries(updatePaymentDto).filter(([_, value]) => value !== undefined));
        const updatedPayment = await this.prisma.pago.update({
            where: { id },
            data: dataToUpdate,
        });
        return updatedPayment;
    }
    async remove(id) {
        try {
            const deletedPayment = await this.prisma.pago.delete({
                where: { id },
            });
            return deletedPayment;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Pago con la id ${id} no encontrado`);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
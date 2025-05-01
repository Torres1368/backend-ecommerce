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
exports.ShippingAddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let ShippingAddressService = class ShippingAddressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShippingAddressDto) {
        try {
            return await this.prisma.direccionEnvio.create({
                data: createShippingAddressDto,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new common_1.BadRequestException('El usuario especificado no existe');
                }
            }
            throw new common_1.InternalServerErrorException('Error al crear la dirección de envío');
        }
    }
    async findAll() {
        return await this.prisma.direccionEnvio.findMany({
            include: {
                usuario: true,
            }
        });
    }
    async findOne(id) {
        const direccion = await this.prisma.direccionEnvio.findUnique({
            where: {
                id
            },
            include: {
                usuario: true,
            }
        });
        if (!direccion) {
            throw new common_1.NotFoundException(`La dirección de envío con ID ${id} no existe`);
        }
        return direccion;
    }
    async update(id, updateShippingAddressDto) {
        const direccion = await this.prisma.direccionEnvio.findUnique({
            where: { id },
        });
        if (!direccion) {
            throw new common_1.NotFoundException(`La dirección de envío con ID ${id} no existe`);
        }
        return await this.prisma.direccionEnvio.update({
            where: { id },
            data: updateShippingAddressDto,
        });
    }
    async remove(id) {
        const direccionFound = await this.prisma.direccionEnvio.findUnique({
            where: { id },
        });
        if (!direccionFound) {
            throw new common_1.NotFoundException(`La dirección de envío con ID ${id} no existe`);
        }
        return this.prisma.direccionEnvio.delete({
            where: { id },
        });
    }
};
exports.ShippingAddressService = ShippingAddressService;
exports.ShippingAddressService = ShippingAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShippingAddressService);
//# sourceMappingURL=shipping-address.service.js.map
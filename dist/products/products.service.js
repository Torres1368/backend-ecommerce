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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const { imagenes, ...productData } = createProductDto;
        return this.prisma.producto.create({
            data: {
                ...productData,
                imagenes: imagenes && imagenes.length > 0 ? {
                    create: imagenes.map(url => ({ url }))
                } : undefined,
            },
            include: {
                imagenes: true,
            },
        });
    }
    async findAll() {
        return this.prisma.producto.findMany();
    }
    async findOne(id) {
        const productoFound = await this.prisma.producto.findUnique({
            where: { id: id, },
        });
        if (!productoFound) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return productoFound;
    }
    async update(id, updateProductDto) {
        const productFound = await this.prisma.producto.findUnique({
            where: { id },
        });
        if (!productFound) {
            throw new common_1.NotFoundException(`No se encontró el producto con la id ${id}`);
        }
        const dataToUpdate = Object.fromEntries(Object.entries(updateProductDto).filter(([_, value]) => value !== undefined));
        const updatedProduct = await this.prisma.producto.update({
            where: { id },
            data: dataToUpdate,
        });
        return updatedProduct;
    }
    async remove(id) {
        const deleteProduct = await this.prisma.producto.delete({
            where: { id }
        });
        if (!deleteProduct) {
            throw new common_1.NotFoundException('Producto con la id ${id} no encontrado');
        }
        return deleteProduct;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map
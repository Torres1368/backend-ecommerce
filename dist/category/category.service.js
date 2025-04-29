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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        return this.prisma.categoria.create({
            data: {
                nombre: createCategoryDto.nombre,
            },
        });
    }
    async findAll() {
        return this.prisma.categoria.findMany();
    }
    async findOne(id) {
        const categoryFound = await this.prisma.categoria.findUnique({
            where: { id },
        });
        if (!categoryFound) {
            throw new common_1.NotFoundException('Categoría no encontrada');
        }
        return categoryFound;
    }
    async update(id, updateCategoryDto) {
        const categoryFound = await this.prisma.categoria.findUnique({
            where: { id },
        });
        if (!categoryFound) {
            throw new common_1.NotFoundException(`No se encontró la categoría con la id ${id}`);
        }
        const dataToUpdate = Object.fromEntries(Object.entries(updateCategoryDto).filter(([_, value]) => value !== undefined));
        const updatedCategory = await this.prisma.categoria.update({
            where: { id },
            data: dataToUpdate,
        });
        return updatedCategory;
    }
    async remove(id) {
        try {
            const deletedCategory = await this.prisma.categoria.delete({
                where: { id },
            });
            return deletedCategory;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Categoría con la id ${id} no encontrada`);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map
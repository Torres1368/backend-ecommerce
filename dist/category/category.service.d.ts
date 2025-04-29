import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Categoria } from '@prisma/client';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findOne(id: string): Promise<Categoria>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Categoria>;
    remove(id: string): Promise<Categoria>;
}

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Producto } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<Producto>;
    findAll(): Promise<Producto[]>;
    findOne(id: string): Promise<Producto>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Producto>;
    remove(id: string): Promise<Producto>;
}

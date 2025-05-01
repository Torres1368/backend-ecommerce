import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        nombre: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        precio: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoriaId: string;
    }>;
    findAll(): Promise<{
        nombre: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        precio: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoriaId: string;
    }[]>;
    findOne(id: string): Promise<{
        nombre: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        precio: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoriaId: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        nombre: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        precio: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoriaId: string;
    }>;
    remove(id: string): Promise<{
        nombre: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descripcion: string | null;
        precio: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoriaId: string;
    }>;
}

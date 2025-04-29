import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Producto } from '@prisma/client';



@Injectable()
export class ProductsService {
  constructor (private prisma:PrismaService){}

  // Actualizado para aceptar el DTO CreateUserDto
  async create(createProductDto: CreateProductDto): Promise<Producto> {
    const { imagenes, ...productData } = createProductDto;

    return this.prisma.producto.create({
      data: {
        ...productData,
        // Si se enviaron imágenes, crea registros en la tabla Imagen usando escritura anidada
        imagenes: imagenes && imagenes.length > 0 ? { 
          create: imagenes.map(url => ({ url })) 
        } : undefined,
      },
      include: {
        imagenes: true, // Si deseas devolver las imágenes junto al producto creado
      },
    });
  }


  async findAll():Promise<Producto[]> {
    return  this.prisma.producto.findMany()
  }

  async findOne(id: string):Promise<Producto | null> {
    const productoFound = await this.prisma.producto.findUnique({
      where:{id:id,},
    });
    if (!productoFound){
      throw new NotFoundException('Producto no encontrado')
    }
    return productoFound
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Producto> {
    // Verificar si el producto existe
    const productFound = await this.prisma.producto.findUnique({
      where: { id },
    });
    
    if (!productFound) {
      throw new NotFoundException(`No se encontró el producto con la id ${id}`);
    }
    
    // Limpiar el objeto para eliminar propiedades con valor undefined
    const dataToUpdate = Object.fromEntries(
      Object.entries(updateProductDto).filter(([_, value]) => value !== undefined)
    );
    
    // Actualizar el producto con el objeto limpio
    const updatedProduct = await this.prisma.producto.update({
      where: { id },
      data: dataToUpdate,
    });
    
    return updatedProduct;
  }
  

  async remove(id: string): Promise<Producto> {
    const productoFound = await this.prisma.producto.findUnique({
      where: { id },
    });
  
    if (!productoFound) {
      throw new NotFoundException(`Producto con la id ${id} no encontrado`);
    }
  
    return this.prisma.producto.delete({
      where: { id },
    });
  }
  
}

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


async findAll(query: Record<string, any>): Promise<Producto[]> {
  // 1) Extraemos params especiales
  const { page = '1', limit = '10', sort, populate, ...filters } = query;

  // 2) Construimos where dinámico
  const where = Object.fromEntries(
    Object.entries(filters).map(([k, v]) => {
      let val: any = v;
      if (v === 'true') val = true;
      else if (v === 'false') val = false;
      else if (!isNaN(+v)) val = +v;
      return [k, val];
    })
  );

  // 3) Construimos orderBy si hay sort (ej: "precio:asc,-nombre:desc")
  const orderBy = sort
    ? (sort as string).split(',').map(part => {
        const [field, dir] = part.split(':');
        return { [field]: dir === 'desc' ? 'desc' : 'asc' };
      })
    : undefined;

  // 4) Paginación
  const pageNum = Math.max(1, parseInt(page as string, 10));
  const take = parseInt(limit as string, 10);
  const skip = (pageNum - 1) * take;

  // 5) Ejecutamos la consulta con las imágenes siempre incluidas
  return this.prisma.producto.findMany({
    where,
    orderBy,
    skip,
    take,
    include: populate === '*' ? { imagenes: true } : { imagenes: true }, // Aquí siempre incluimos las imágenes
  });
}


  async findOne(id: string, populate?: string): Promise<Producto> {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: populate === '*' ? { imagenes: true } : {},
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
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

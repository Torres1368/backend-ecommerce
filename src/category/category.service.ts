import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: {
        nombre: createCategoryDto.nombre,
      },
    });
  }
   
  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: string): Promise<Categoria> {
    const categoryFound = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoryFound) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return categoryFound;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Categoria> {
    const categoryFound = await this.prisma.categoria.findUnique({
      where: { id },
    });
  
    if (!categoryFound) {
      throw new NotFoundException(`No se encontró la categoría con la id ${id}`);
    }
  
    const dataToUpdate = Object.fromEntries(
      Object.entries(updateCategoryDto).filter(([_, value]) => value !== undefined)
    );
  
    const updatedCategory = await this.prisma.categoria.update({
      where: { id },
      data: dataToUpdate,
    });
  
    return updatedCategory;
  }

  async remove(id: string): Promise<Categoria> {
    try {
      const deletedCategory = await this.prisma.categoria.delete({
        where: { id },
      });
      return deletedCategory;
    } catch (error) {
      throw new NotFoundException(`Categoría con la id ${id} no encontrada`);
    }
  }
  
}

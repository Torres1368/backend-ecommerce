import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'; // <-- Importante

import { FilesInterceptor } from '@nestjs/platform-express';
import {UseInterceptors,UploadedFiles,BadRequestException,} from '@nestjs/common';
import { Producto } from '@prisma/client';

@ApiTags ('productos')
//@ApiBearerAuth() // Para Swagger (token en header)
//@UseGuards(AuthGuard('jwt')) // Para NestJS (proteger rutas con JWT)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @UseInterceptors(FilesInterceptor('imagenes', 5))
  async create(
    @UploadedFiles() files: any[],
    @Body() createProductDto: CreateProductDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Debes subir al menos una imagen');
    }
    const imagenes = files.map(f => (f as any).path as string);
    return this.productsService.create({ ...createProductDto, imagenes });
  }
  
  

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Retorna productos filtrados/paginados/ordenados' })
  findAll(@Query() query: Record<string, any>): Promise<Producto[]> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(
    @Param('id') id: string,
    @Query('populate') populate?: string
  ): Promise<Producto> {
    return this.productsService.findOne(id, populate);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto a actualizar' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del producto a eliminar' })
  @ApiResponse({ status: 204, description: 'Producto eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

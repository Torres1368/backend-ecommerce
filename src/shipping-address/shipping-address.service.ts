import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { DireccionEnvio, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ShippingAddress } from './entities/shipping-address.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ShippingAddressService {
  constructor(private prisma:PrismaService){}
  async create(createShippingAddressDto: CreateShippingAddressDto): Promise<DireccionEnvio> {
    try {
      return await this.prisma.direccionEnvio.create({
        data: createShippingAddressDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Ejemplo: Clave foránea no válida (usuarioId inexistente)
        if (error.code === 'P2003') {
          throw new BadRequestException('El usuario especificado no existe');
        }
      }
      throw new InternalServerErrorException('Error al crear la dirección de envío');
    }
  }


  async findAll():Promise<DireccionEnvio[]> {
    return await this.prisma.direccionEnvio.findMany({
      include: {
        usuario: true,
      }
    })
  }

  async findOne(id: string):Promise<DireccionEnvio> {
    const direccion = await this.prisma.direccionEnvio.findUnique({
      where: {
        id
      },
      include: {
        usuario: true,
      }
    });
    if (!direccion) {
      throw new NotFoundException(`La dirección de envío con ID ${id} no existe`);
    }
    return direccion;
  }



  async update(id: string, updateShippingAddressDto: UpdateShippingAddressDto): Promise<DireccionEnvio> {
    const direccion = await this.prisma.direccionEnvio.findUnique({
      where: { id },
    });
  
    if (!direccion) {
      throw new NotFoundException(`La dirección de envío con ID ${id} no existe`);
    }
  
    return await this.prisma.direccionEnvio.update({
      where: { id },
      data: updateShippingAddressDto,
    });
  }
  
  async remove(id: string): Promise<DireccionEnvio> {
    const direccionFound = await this.prisma.direccionEnvio.findUnique({
      where: { id },
    });
  
    if (!direccionFound) {
      throw new NotFoundException(`La dirección de envío con ID ${id} no existe`);
    }
  
    return this.prisma.direccionEnvio.delete({
      where: { id },
    });
  }
  
}
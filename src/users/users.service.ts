import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Actualizado para aceptar el DTO CreateUserDto
  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    try{
      return await this.prisma.usuario.create({
        data: createUserDto, // Utiliza el DTO directamente
      });
    }catch(error){
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === "P2002"){
          throw new ConflictException(`Producto con el correo ${createUserDto.email} ya existe`);
        }
      }
      throw error;
    }
  }

  // Método para encontrar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  // Método para encontrar un usuario por su id
  async findOne(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  // Método actualizado para utilizar UpdateUserDto
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUserDto, // Actualiza con el DTO
    });
  }

  // Método para eliminar un usuario
  async remove(id: string): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}

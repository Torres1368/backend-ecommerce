
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

import { Usuario } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

@Post()
async create(@Body() createUserDto: CreateUserDto): Promise<Usuario>{
    return this.usersService.create(createUserDto);
}

@Get()
async findAll(): Promise<Usuario[]>{
    return this.usersService.findAll();
}

@Get(':id')
async findOne(@Param('id') id: string): Promise<Usuario | null> {
    const userEncontrado = await this.usersService.findOne(id);
    if (!userEncontrado) {
        throw new NotFoundException('Usuario no encontrado');
    }
    return userEncontrado;
}


@Patch(':id')
async update(@Param('id')id:string,@Body()updateUserDto:UpdateUserDto,): Promise<Usuario>{
    try{
        return await this.usersService.update(id, updateUserDto);
    }catch(error){
        throw new NotFoundException('Usuario no existe')
    }
}

@Delete(':id')
async remove(@Param('id')id:string):Promise<Usuario>{
    try{
        return await this.usersService.remove(id);
    }catch(error){
        throw new NotFoundException("El usuario no existe")
    }
}


}

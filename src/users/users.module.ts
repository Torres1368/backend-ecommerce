import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service'; //import
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService], //servicio exportado de prisma 
  exports : [UsersService], 
  controllers: [UsersController] //exportando el servicio de users
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, CategoryModule],//importacion Prisma Module del archivo con el mismo nombre prisma.module.ts
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

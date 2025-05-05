import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule,  ProductsModule, CategoryModule, OrdersModule,PaymentModule,
    ShippingAddressModule, 
    PassportModule, //autenticacion jwt
    AuthModule, //autenticacion jwt
  ],//importacion Prisma Module del archivo con el mismo nombre prisma.module.ts
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

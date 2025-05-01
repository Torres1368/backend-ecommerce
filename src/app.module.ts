import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { Payment } from './payment/entities/payment.entity';
import { PaymentModule } from './payment/payment.module';
import { ShippingAddress } from './shipping-address/entities/shipping-address.entity';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';

@Module({
  imports: [PrismaModule, UsersModule,  ProductsModule, CategoryModule, OrdersModule,PaymentModule,
    ShippingAddressModule
  ],//importacion Prisma Module del archivo con el mismo nombre prisma.module.ts
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

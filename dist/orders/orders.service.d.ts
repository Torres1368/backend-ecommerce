import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
import { Pedido } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<Pedido>;
    findAll(): Promise<Pedido[]>;
    findOne(id: string): Promise<Pedido>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Pedido>;
    remove(id: string): Promise<Pedido>;
}

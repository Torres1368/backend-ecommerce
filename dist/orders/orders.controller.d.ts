import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(id: string): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: string): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
    }>;
}

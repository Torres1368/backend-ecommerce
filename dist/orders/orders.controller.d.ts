import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: string;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
        direccion: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
        direccion: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
        direccion: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: string;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
        direccion: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        usuarioId: string;
        estado: import(".prisma/client").$Enums.EstadoPedido;
        total: import("@prisma/client/runtime/library").Decimal;
        direccion: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

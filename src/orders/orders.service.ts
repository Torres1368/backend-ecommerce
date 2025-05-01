import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
import { Pedido } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Pedido> {
    const { productos, pagoId, ...pedidoData } = createOrderDto;

    const total = productos.reduce(
      (sum, item) => sum + item.cantidad * item.precioUnitario,
      0
    );

    const pedido = await this.prisma.pedido.create({
      data: {
        ...pedidoData,
        total,
        pago: pagoId ? { connect: { id: pagoId } } : undefined,
        productos: {
          create: productos.map((p) => ({
            producto: { connect: { id: p.productoId } },
            cantidad: p.cantidad,
            precioUnitario: p.precioUnitario,
          })),
        },
      },
      include: {
        productos: true,
      },
    });

    return pedido;
  }

  async findAll(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany({
      include: {
        productos: true,
        pago: true,
        usuario: true,
      },
    });
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        productos: true,
        pago: true,
        usuario: true,
      },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }

    return pedido;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Pedido> {
    const pedidoExistente = await this.prisma.pedido.findUnique({ where: { id } });

    if (!pedidoExistente) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }

    const dataToUpdate = Object.fromEntries(
      Object.entries(updateOrderDto).filter(([_, value]) => value !== undefined)
    );

    const pedidoActualizado = await this.prisma.pedido.update({
      where: { id },
      data: dataToUpdate,
    });

    return pedidoActualizado;
  }

  async remove(id: string): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }

    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}

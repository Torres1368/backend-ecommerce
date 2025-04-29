import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}


  async create(createPaymentDto: CreatePaymentDto):Promise<Payment> {
    return this.prisma.pago.create({
      data: createPaymentDto,
    });
  }

  async findAll():Promise<Payment[]> {
    return this.prisma.pago.findMany();
  }

  async findOne(id: string):Promise<Payment | null> {
    const paymentFound = await this.prisma.pago.findUnique({
      where: {
        id: id,
      },
    });
    if(!paymentFound){
      throw new Error('Pago no encontrado');
    }
    return paymentFound;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}

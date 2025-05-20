import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'rxjs';

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

  async findOne(id: string):Promise<Payment> {
    const paymentFound = await this.prisma.pago.findUnique({
      where: {
        id: id,
      },
    });
    if(!paymentFound){
      throw new NotFoundException('Pago no encontrado');
    }
    return paymentFound;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto):Promise<Payment> {
    const paymentFound = await this.prisma.pago.findUnique({
      where: {
        id: id,
      },
    });
    if(!paymentFound){
      throw new NotFoundException('Pago no encontrado');
    }

    const dataToUpdate = Object.fromEntries(
      Object.entries(updatePaymentDto).filter(([_, value]) => value !== undefined)
    );

    const updatedPayment = await this.prisma.pago.update({
      where: { id },
      data: dataToUpdate,
    });
  
    return updatedPayment;
  }


  async remove(id: string):Promise<Payment> {
    try{
      const deletedPayment = await this.prisma.pago.delete({
        where: {id},
      });
      return deletedPayment;
    }catch(error){
      throw new NotFoundException(`Pago con la id ${id} no encontrado`);
    }
  }
}

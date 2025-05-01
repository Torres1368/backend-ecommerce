import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags ('pagos')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({summary: 'Crear un pago'})
  @ApiResponse({ status: 201, description: 'Pago creado correctamente' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @ApiResponse({status:200, description: 'Retornar todos los pagos'})
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del pago' })
  @ApiResponse({ status: 200, description: 'Pago encontrado'})
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pago por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del pago a actualizar' })
  @ApiResponse({ status: 200, description: 'Pago actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un pago por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del pago a eliminar' })
  @ApiResponse({ status: 204, description: 'Pago eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}

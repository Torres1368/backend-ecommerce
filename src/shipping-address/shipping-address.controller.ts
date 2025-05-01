import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';


@ApiTags ('Direccion envio')
@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post()
  @ApiOperation({summary: 'Crear direccion de envio'})
  @ApiResponse({ status: 201, description: 'Direccion de envio creada correctamente' })
  create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos las direcciones de envio' })
  @ApiResponse({status:200, description: 'Retornar todos las direcciones de envio de los usuarios'})
  findAll() {
    return this.shippingAddressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una direccion de envio por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la direccion de envio' })
  @ApiResponse({ status: 200, description: 'Direccion de envio encontrada'})
  @ApiResponse({ status: 404, description: 'Direccion de envio no encontrada' })
  findOne(@Param('id') id: string) {
    return this.shippingAddressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una direccion de envio por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de direccion de envio a actualizar' })
  @ApiResponse({ status: 200, description: 'Direccion de envio actualizada correctamente' })
  @ApiResponse({ status: 404, description: 'Direccion de envio no encontrada' })
  update(@Param('id') id: string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.shippingAddressService.update(id, updateShippingAddressDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar una direccion de envio por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la direccion de envio a eliminar' })
  @ApiResponse({ status: 204, description: 'Direccion de envio eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Direccion de envio no encontrada' })
  remove(@Param('id') id: string) {
    return this.shippingAddressService.remove(id);
  }
}

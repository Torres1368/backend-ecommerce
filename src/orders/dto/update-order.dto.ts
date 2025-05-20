import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export type UpdateOrderDto = Partial<CreateOrderDto>

import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested
} from "class-validator";

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  PROCESANDO = 'PROCESANDO',
  ENVIADO = 'ENVIADO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO'
}

class PedidoProductoDto {
  @IsUUID()
  @IsNotEmpty()
  productoId: string;

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  readonly usuarioId: string;

  @IsEnum(EstadoPedido)
  readonly estado: EstadoPedido;

  @IsNumber()
  @Min(0)
  readonly total: number;

  @IsString()
  @IsNotEmpty()
  readonly direccion: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoProductoDto)
  readonly productos: PedidoProductoDto[];

  @IsOptional()
  @IsUUID()
  readonly pagoId?: string;
}

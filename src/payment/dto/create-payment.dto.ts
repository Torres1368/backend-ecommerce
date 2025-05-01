import { EstadoPago, MetodoPago } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDecimal, IsEnum, IsNumber, IsString, IsUUID, Min, min } from "class-validator";

export class CreatePaymentDto {
    @IsUUID()
    readonly pedidoId: string;
    
    @IsEnum(MetodoPago)
    readonly metodo: MetodoPago;

    @IsEnum(EstadoPago)
    readonly estado: EstadoPago;

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    readonly monto: number;
}

import { EstadoPago, MetodoPago } from "@prisma/client";
export declare class CreatePaymentDto {
    readonly pedidoId: string;
    readonly metodo: MetodoPago;
    readonly estado: EstadoPago;
    readonly monto: number;
}

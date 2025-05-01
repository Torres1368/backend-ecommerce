export declare enum EstadoPedido {
    PENDIENTE = "PENDIENTE",
    PROCESANDO = "PROCESANDO",
    ENVIADO = "ENVIADO",
    ENTREGADO = "ENTREGADO",
    CANCELADO = "CANCELADO"
}
declare class PedidoProductoDto {
    productoId: string;
    cantidad: number;
    precioUnitario: number;
}
export declare class CreateOrderDto {
    readonly usuarioId: string;
    readonly estado: EstadoPedido;
    readonly total: number;
    readonly direccion: string;
    readonly productos: PedidoProductoDto[];
    readonly pagoId?: string;
}
export {};

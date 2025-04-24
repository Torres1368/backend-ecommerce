export declare class CreateProductDto {
    readonly nombre: string;
    readonly descripcion?: string;
    readonly precio: number;
    readonly stock: number;
    readonly categoriaId: string;
    readonly imagenes?: string[];
}

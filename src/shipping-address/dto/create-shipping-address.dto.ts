import { IsString, IsUUID } from "class-validator";

export class CreateShippingAddressDto {
    @IsUUID()
    readonly usuarioId: string;

    @IsString()
    readonly direccion: string;

    @IsString()
    readonly ciudad: string;

    @IsString()
    readonly codigoPostal: string; 

    @IsString()
    readonly pais: string;
}

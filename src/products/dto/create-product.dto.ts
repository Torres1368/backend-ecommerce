
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min, ArrayMaxSize } from "class-validator";

export class CreateProductDto {
    @IsString()
    readonly nombre:string;

    @IsOptional()
    @IsString()
    readonly descripcion?:string;


    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(()=>Number)
    readonly precio:number;

    @IsInt()
    @Min(0)
    @Type(()=>Number)
    readonly stock:number;

    @IsUUID()
    readonly categoriaId:string;

  // Campo opcional para las imágenes, como un array de URLs
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(5)
    @IsString({ each: true })
    readonly imagenes?: string[];
}

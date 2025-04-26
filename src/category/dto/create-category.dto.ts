
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min,  } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    readonly nombre:string;

   
}


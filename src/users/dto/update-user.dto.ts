import { IsString, IsEmail, IsOptional,IsEnum } from 'class-validator';
import { Rol } from '@prisma/client'; 

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;



  @IsEnum(Rol)
  rol: Rol;  // Acepta 'Rol' o 'undefined'

  @IsOptional()
  @IsString()
  readonly direccion?: string;

  @IsOptional()
  @IsString()
  readonly telefono?: string;
}

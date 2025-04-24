
import { IsString, IsEmail, IsOptional,IsEnum } from 'class-validator';
import { Rol } from '@prisma/client'; 

export class CreateUserDto {
  @IsString()
  readonly nombre: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(Rol)
  rol: Rol; 

  @IsOptional()
  @IsString()
  readonly direccion?: string;

  @IsOptional()
  @IsString()
  readonly telefono?: string;
}

import { Controller, Post, Body } from '@nestjs/common';



import { Rol } from '@prisma/client';
import { RefreshDto } from './refresh.dto';
import { LoginDto } from './login.dto';
import { AuthService } from '../auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body('nombre') nombre: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('rol') rol: Rol,
  ) {
    return this.authService.register(nombre, email, password, rol);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}

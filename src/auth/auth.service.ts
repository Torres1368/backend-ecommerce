import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // 👈 Importar esto
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Rol } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private getTokens(userId: string, rol: Rol) {
    const accessPayload = { sub: userId, rol, authType: 'login' as const };
    const refreshPayload = { sub: userId, rol };

    return {
      accessToken: this.jwtService.sign(accessPayload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(refreshPayload, { expiresIn: '7d' }),
    };
  }

  async register(nombre: string, email: string, password: string, rol: Rol) {
    const hash = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.usuario.create({
        data: { nombre, email, password: hash, rol },
      });
      const { password: _, ...rest } = user;
      return rest;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(`Ya existe un usuario con el ${error.meta?.target?.[0]}`);
      }
      throw error;
    }
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');
    return this.getTokens(user.id, user.rol);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{ sub: string; rol: Rol }>(
        refreshToken,
      );
      return {
        accessToken: this.jwtService.sign(
          { sub: payload.sub, rol: payload.rol, authType: 'refresh' as const },
          { expiresIn: '15m' },
        ),
      };
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}

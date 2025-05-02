import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Rol } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  rol: Rol;
  authType: 'login' | 'refresh';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'super-secret',
    });
  }

  async validate(payload: JwtPayload) {
    // request.user = { userId, rol, authType }
    return { userId: payload.sub, rol: payload.rol, authType: payload.authType };
  }
}

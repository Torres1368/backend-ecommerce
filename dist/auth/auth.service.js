"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    getTokens(userId, rol) {
        const accessPayload = { sub: userId, rol, authType: 'login' };
        const refreshPayload = { sub: userId, rol };
        return {
            accessToken: this.jwtService.sign(accessPayload, { expiresIn: '15m' }),
            refreshToken: this.jwtService.sign(refreshPayload, { expiresIn: '7d' }),
        };
    }
    async register(nombre, email, password, rol) {
        const hash = await bcrypt.hash(password, 10);
        try {
            const user = await this.prisma.usuario.create({
                data: { nombre, email, password: hash, rol },
            });
            const { password: _, ...rest } = user;
            return rest;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.BadRequestException(`Ya existe un usuario con el ${error.meta?.target?.[0]}`);
            }
            throw error;
        }
    }
    async login(email, pass) {
        const user = await this.prisma.usuario.findUnique({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const valid = await bcrypt.compare(pass, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        return this.getTokens(user.id, user.rol);
    }
    async refresh(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            return {
                accessToken: this.jwtService.sign({ sub: payload.sub, rol: payload.rol, authType: 'refresh' }, { expiresIn: '15m' }),
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token inválido');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
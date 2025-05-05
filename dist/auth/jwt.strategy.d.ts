import { Strategy } from 'passport-jwt';
import { Rol } from '@prisma/client';
export interface JwtPayload {
    sub: string;
    rol: Rol;
    authType: 'login' | 'refresh';
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: string;
        rol: import(".prisma/client").$Enums.Rol;
        authType: "login" | "refresh";
    }>;
}
export {};

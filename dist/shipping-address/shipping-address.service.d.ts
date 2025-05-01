import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { DireccionEnvio } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class ShippingAddressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createShippingAddressDto: CreateShippingAddressDto): Promise<DireccionEnvio>;
    findAll(): Promise<DireccionEnvio[]>;
    findOne(id: string): Promise<DireccionEnvio>;
    update(id: string, updateShippingAddressDto: UpdateShippingAddressDto): Promise<DireccionEnvio>;
}

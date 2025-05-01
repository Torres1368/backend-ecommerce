import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
export declare class ShippingAddressController {
    private readonly shippingAddressService;
    constructor(shippingAddressService: ShippingAddressService);
    create(createShippingAddressDto: CreateShippingAddressDto): Promise<{
        id: string;
        usuarioId: string;
        direccion: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        usuarioId: string;
        direccion: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        usuarioId: string;
        direccion: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
        createdAt: Date;
    }>;
    update(id: string, updateShippingAddressDto: UpdateShippingAddressDto): Promise<{
        id: string;
        usuarioId: string;
        direccion: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        usuarioId: string;
        direccion: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
        createdAt: Date;
    }>;
}

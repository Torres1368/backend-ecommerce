import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
export declare class ShippingAddressController {
    private readonly shippingAddressService;
    constructor(shippingAddressService: ShippingAddressService);
    create(createShippingAddressDto: CreateShippingAddressDto): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        usuarioId: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
    }>;
    findAll(): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        usuarioId: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
    }[]>;
    findOne(id: string): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        usuarioId: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
    }>;
    update(id: string, updateShippingAddressDto: UpdateShippingAddressDto): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        usuarioId: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
    }>;
    remove(id: string): Promise<{
        direccion: string;
        id: string;
        createdAt: Date;
        usuarioId: string;
        ciudad: string;
        codigoPostal: string;
        pais: string;
    }>;
}

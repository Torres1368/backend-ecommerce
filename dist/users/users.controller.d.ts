import { UsersService } from './users.service';
import { Usuario } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: string): Promise<Usuario | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Usuario>;
    remove(id: string): Promise<Usuario>;
}

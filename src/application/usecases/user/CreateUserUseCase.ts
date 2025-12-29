import { CreateUserDto } from "@/application/dto/userDtos/CreateUserDto";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { userType } from "@/domain/enums/userType";
import { Result } from "@/env/Result";
import { request } from "http";


export class CreateUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(dto: CreateUserDto): Promise<Result<User>>{
            const user = new User(dto.name, dto.type, dto.address)

            const saved = await this.userRepository.create(user);

            return saved;
    }
}
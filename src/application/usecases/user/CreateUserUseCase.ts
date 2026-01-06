import { User } from "../../../domain/entities/User";
import { Result } from "../../../env/Result";
import { CreateUserDto } from "../../dto/userDtos/CreateUserDto";
import { IUserRepository } from "../../interfaces/IUserRepository";


export class CreateUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(dto: CreateUserDto): Promise<Result<User>>{
            const user = new User(dto.name, dto.type, dto.address)

            const saved = await this.userRepository.create(user);

            return saved;
    }
}
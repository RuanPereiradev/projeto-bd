import { GetUserDto } from "@/application/dto/userDtos/GetUserDto";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { Result } from "@/env/Result";

export class GetUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(dto: GetUserDto): Promise<Result<User>>{
        const userResult = await this.userRepository.findById(dto.id)
            if(userResult.isFailure){
                return Result.fail("Falha no user result")
            }
            if(!userResult.getValue()){
                return Result.fail("Usuário não encontrado")
            }

            const user = userResult.getValue();

            if(!user){
                return Result.fail("Usuário não encontrado")
            }
            return Result.ok<User>(user);
    }
}
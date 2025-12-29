import { DeleteUserDto } from "@/application/dto/userDtos/DeleteUserDto";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { Result } from "@/env/Result";

export class DeleteUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(dto: DeleteUserDto): Promise<Result<User>>{
        const userResult = await this.userRepository.findById(dto.id)
        
        if(userResult.isFailure){
            return Result.fail("erro ao encontrar usuário")
        }

        const existingUser = userResult.getValue();

        if(!existingUser?.userId){
            return Result.fail("usuário nao encontrado")
        }
        await this.userRepository.softDelete(existingUser.userId)

        return Result.ok<User>();
    }
}
import { UpdateUserDto } from "@/application/dto/userDtos/UpdateUserDto";
import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";
import { Result } from "@/env/Result";

export class UpdateUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(dto: UpdateUserDto): Promise<Result<User>>{
        const userResult = await this.userRepository.findById(dto.id)
        if(userResult.isFailure){
            return Result.fail("Falha no user result")
        } 
        const user = userResult.getValue();

        if(!user){
            return Result.fail("User not found");
        }

        if(dto.address){
            const addressResult = user?.changeAddress(dto.address)
            if(addressResult?.isFailure){
               return Result.fail(addressResult.getError())
            }
        }

        if(dto.name){
            const nameResult = user?.changeName(dto.name)
            if(nameResult?.isFailure){
                return Result.fail(nameResult.getError())
            }
        }

        if(dto.type){
            const typeResult = user?.changeType(dto.type)
            if(typeResult?.isFailure){
                return Result.fail(typeResult.getError())
            }
        }
        const result = await this.userRepository.update(user)
        return result
    }
}
import { FastifyReply, FastifyRequest } from "fastify";

import { ApiResponse } from "../Wrappers/ApiResponse";
import { UserRepository } from "../../infra/repositories/UserRepository";
import { ApiResponseValidationFilter } from "../Filters/ApiResponseValidationFilter";
import { CreateUserDto } from "../../application/dto/userDtos/CreateUserDto";
import { userType } from "../../domain/enums/userType";
import { CreateUserUseCase } from "../../application/usecases/user/CreateUserUseCase";

export class UserController{
    private userRepository: UserRepository;
    private responseFilter: ApiResponseValidationFilter;

    constructor(){
        this.userRepository = new UserRepository();
        this.responseFilter = new ApiResponseValidationFilter();
    }


    async createUser(request: FastifyRequest<{Body: CreateUserDto}>, reply: FastifyReply){
        try {
            const {name, type, address} = request.body as{
                name: string;
                type: userType;
                address: string;
            }

            const useCase = new CreateUserUseCase(this.userRepository);

            const result = await useCase.execute({
                name,
                type,
                address
            });

            const response = this.responseFilter.handleResponse(result);

            return reply.status(response.success ? 201 : 400).send(response)

        } catch (error: any) {
            console.error(error);
                const response = this.responseFilter.handleResponse(
                ApiResponse.fail(["Erro ao criar usuário"])
            );

            return reply.status(500).send(response);  
        }
    }
}


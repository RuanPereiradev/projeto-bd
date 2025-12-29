import { ListLoanByUserDto } from "@/application/dto/loanDtos/ListLoanByUserDto";
import { ILoanRepository } from "@/application/interfaces/ILoanRepository";
import { Loan } from "@/domain/entities/Loan";
import { Result } from "@/env/Result";

export class ListLoanByUserUseCase{
    constructor(private loanRepository: ILoanRepository){}

    async execute(dto: ListLoanByUserDto): Promise<Result<Loan[]>>{
            if(!dto.userId){
                return Result.fail("Usuário inválido")
            }
            const loanUserResult = await this.loanRepository.listByUserId(dto.userId)
            if(loanUserResult.isFailure){
                return Result.fail("erro ao buscar emprestimos")
            }

            return Result.ok(loanUserResult.getValue())
    }   
}